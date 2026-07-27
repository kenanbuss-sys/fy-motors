// FAMES Admin — prijava (Vercel serverless funkcija)
// Env varijable (Vercel → Settings → Environment Variables):
//   ADMIN_USER    – korisničko ime
//   ADMIN_PASS    – šifra
//   GITHUB_TOKEN  – fine-grained PAT (repo fy-motors, Contents: Read and write)
//   GITHUB_REPO   – npr. "kenanbuss-sys/fy-motors" (opciono, ovo je default)

let lastFail = 0;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { user, pass } = req.body || {};
  const U = process.env.ADMIN_USER, P = process.env.ADMIN_PASS, T = process.env.GITHUB_TOKEN;

  if (!U || !P || !T) {
    res.status(500).json({ error: 'Server nije konfigurisan — dodaj ADMIN_USER, ADMIN_PASS i GITHUB_TOKEN u Vercel Environment Variables.' });
    return;
  }

  // usporavanje nakon promašaja (grubi anti-brute-force)
  const wait = lastFail + 2000 - Date.now();
  if (wait > 0) await new Promise(r => setTimeout(r, wait));

  const ok = typeof user === 'string' && typeof pass === 'string'
    && timingSafeEq(user.trim().toLowerCase(), U.trim().toLowerCase())
    && timingSafeEq(pass, P);

  if (!ok) {
    lastFail = Date.now();
    res.status(401).json({ error: 'Pogrešno korisničko ime ili šifra.' });
    return;
  }

  res.status(200).json({ token: T, repo: process.env.GITHUB_REPO || 'kenanbuss-sys/fy-motors' });
}

function timingSafeEq(a, b) {
  const A = Buffer.from(String(a)), B = Buffer.from(String(b));
  if (A.length !== B.length) return false;
  let d = 0;
  for (let i = 0; i < A.length; i++) d |= A[i] ^ B[i];
  return d === 0;
}
