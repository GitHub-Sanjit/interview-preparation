function anagram(s, t) {
  if (s.length !== t.length) return false;
  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    map.set(char, (map.get(char) || 0) + 1);
  }
  for (let i = 0; i < t.length; i++) {
    let char = t[i];
    if (!map.get(char)) return false;
    map.set(char, map.get(char) - 1);
    if (map.get(char) < 0) return false;
  }
  return true;
}

console.log(anagram("anagram", "margana"));
