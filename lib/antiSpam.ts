// Anti-Spam protection utilities for Lead Submissions

interface AntiSpamInput {
  name?: string;
  email?: string;
  whatsappNumber?: string;
  message?: string;
  hp_website?: string;
  _formLoadedAt?: number | string;
}

interface AntiSpamResult {
  isSpam: boolean;
  reason?: string;
  isRateLimited?: boolean;
}

// In-memory sliding window rate limiter: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 leads per 10 minutes per IP

// Periodically clean up rate limit map to prevent memory leak
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (validTimestamps.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, validTimestamps);
      }
    }
  }, 5 * 60 * 1000);
  if (typeof timer.unref === "function") {
    timer.unref();
  }
}

/**
 * Checks if a string has excessive consecutive consonants (e.g. "kKPXJ", "qyrGpXYG", "Lmtpws", "Koktxh")
 */
function hasExcessiveConsonants(str: string, threshold = 5): boolean {
  const consonantClusterRegex = new RegExp(`[bcdfghjklmnpqrstvwxyz]{${threshold},}`, "i");
  return consonantClusterRegex.test(str);
}

/**
 * Checks if a text looks like a single unbroken random token (e.g., "HwrpLsUWluvcJLNUpfuo", "taMMTJqrlKnyHnPqJKoDqUj")
 */
function isRandomToken(text: string): boolean {
  const trimmed = text.trim();
  // If it's 12+ characters long with NO spaces and contains both lowercase and uppercase or digits
  if (
    trimmed.length >= 12 &&
    !trimmed.includes(" ") &&
    /[a-z]/.test(trimmed) &&
    /[A-Z0-9]/.test(trimmed)
  ) {
    return true;
  }
  return false;
}

/**
 * Validates lead submission data and IP to detect spam bots.
 */
export function validateAntiSpam(data: AntiSpamInput, ip?: string): AntiSpamResult {
  const now = Date.now();

  // 1. IP Rate Limiting Check
  if (ip && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return {
        isSpam: true,
        isRateLimited: true,
        reason: "Rate limit exceeded (Too many submissions)",
      };
    }

    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);
  }

  // 2. Honeypot Check (Bots fill out hidden fields; humans never do)
  if (data.hp_website && data.hp_website.trim().length > 0) {
    return {
      isSpam: true,
      reason: "Honeypot field was filled",
    };
  }

  // 3. Time-to-Submit Check (Humans take at least 1.5 - 2s to fill 4 fields)
  if (data._formLoadedAt) {
    const loadedAt = Number(data._formLoadedAt);
    if (!isNaN(loadedAt)) {
      const elapsedMs = now - loadedAt;
      if (elapsedMs < 1500) {
        return {
          isSpam: true,
          reason: `Submission occurred too quickly (${elapsedMs}ms)`,
        };
      }
      // If loadedAt is in the future by more than 15s (clock drift tolerance)
      if (loadedAt - now > 15000) {
        return {
          isSpam: true,
          reason: "Invalid timestamp from the future",
        };
      }
    }
  }

  const { name = "", email = "", message = "", whatsappNumber = "" } = data;

  // 4. Email validation & spam pattern
  const emailLower = email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailLower)) {
    return {
      isSpam: true,
      reason: "Invalid email address format",
    };
  }

  const [localPart] = emailLower.split("@");
  // Spammers frequently use dotted Gmail alias farms (e.g. male.k.s.an.d.r.ax.9@gmail.com -> 7 dots)
  const dotCount = (localPart.match(/\./g) || []).length;
  if (dotCount >= 4) {
    return {
      isSpam: true,
      reason: `Suspicious email with excessive dots (${dotCount} dots)`,
    };
  }

  // 5. Message spam patterns
  const msgTrimmed = message.trim();
  if (isRandomToken(msgTrimmed)) {
    return {
      isSpam: true,
      reason: "Message is a single random alphanumeric token",
    };
  }

  if (hasExcessiveConsonants(msgTrimmed, 6)) {
    return {
      isSpam: true,
      reason: "Message contains unnatural consonant cluster",
    };
  }

  // 6. Name spam patterns
  const nameTrimmed = name.trim();
  // Check for unnatural names like "Lmtpws" or "Kspq"
  const nameWords = nameTrimmed.split(/\s+/);
  for (const word of nameWords) {
    if (word.length >= 4 && hasExcessiveConsonants(word, 4)) {
      return {
        isSpam: true,
        reason: `Suspicious name with excessive consonants: ${word}`,
      };
    }
  }

  // 7. Phone validation
  const digitsOnly = whatsappNumber.replace(/[^0-9]/g, "");
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return {
      isSpam: true,
      reason: "Invalid phone number length",
    };
  }

  // Check repeating digits like 1111111111 or 0000000000
  if (/^(\d)\1{7,}$/.test(digitsOnly)) {
    return {
      isSpam: true,
      reason: "Dummy phone number with repeating digits",
    };
  }

  return { isSpam: false };
}
