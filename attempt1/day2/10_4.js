// 4. First Unique Character in String
// input-> "leetcodel";  output-> 0

function firstUniqueChar(str) {
  const freq = {};
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let i = 0; i < str.length - 1; i++) {
    if (freq[str[i]] === 1) return i;
  }
  return -1;
}

console.log(firstUniqueChar("leetcodelctod"));
