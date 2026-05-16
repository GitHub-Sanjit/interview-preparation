function anagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const map = new Map();
  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (let char of t) {
    if (!map.has(char)) return false;

    map.set(char, map.get(char) - 1);

    if (map.get(char) < 0) return false;
  }
  return true;
}

const result = anagram("anagram", "nagaram")
console.log(result)
