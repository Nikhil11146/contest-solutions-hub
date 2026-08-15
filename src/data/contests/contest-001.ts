/* eslint-disable prettier/prettier */
import type { Contest } from "../types";

export const contest001: Contest = {
  id: "ascent-weekly-1",
  number: 1,
  title: "Ascent Weekly 1",
  date: "2026-08-15",
  summary:
  "A mixed-difficulty round covering combinatorics, greedy reasoning, string manipulation, sorting, sliding windows, median tracking, and frequency-based substring analysis.",
  questions: [
    {
  slug: "handshake",
  title: "Handshake",
  tags: ["Math", "Combinatorics"],
  difficulty: "Easy",
  acceptanceRate: 94.12,
  statement: [
    "At the annual meeting of Board of Directors of Acme Inc., everyone attending shakes hands exactly once with every other attendee.",
    "Given the number of attendees, determine the total number of handshakes that take place."
  ],
  examples: [
    {
      input: "n = 1",
      output: "0",
      explanation:
        "The lonely board member shakes no hands, so there are 0 handshakes."
    },
    {
      input: "n = 2",
      output: "1",
      explanation:
        "There are 2 board members, so exactly 1 handshake takes place."
    }
  ],
  constraints: [
    "1 <= t <= 1000",
    "0 < n < 10^6"
  ],
  solution: [
    "Each person can shake hands with n - 1 other people.",
    "This gives n * (n - 1) possible person-to-person handshakes if we count the handshake from the perspective of every person.",
    "However, every handshake is counted twice in that calculation, once for each of the two people involved.",
    "Therefore, we divide by 2 to obtain the number of unique handshakes.",
    "The result is n * (n - 1) / 2.",
    "This is also the combination formula nC2, which represents the number of ways to choose 2 people from n people.",
    "Using the combination formula, nC2 = n! / (2! * (n - 2)!), which simplifies to n * (n - 1) / 2."
  ],
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  code: {
    cpp: `int handshakes(int n) {
    return n * (n - 1) / 2;
}`,
    python: `def handshakes(n):
    return n * (n - 1) // 2`,
    java: `public static int handshakes(int n) {
    return n * (n - 1) / 2;
}`,
  },
    },
    {
  slug: "happy-ladybugs",
  title: "Happy Ladybugs",
  tags: ["Greedy", "String", "Counting"],
  difficulty: "Easy",
  acceptanceRate: 85.00,
  statement: [
    "Happy Ladybugs is a board game represented by a string b of length n. Each character represents a cell on the board.",
    "An underscore (_) represents an empty cell. An uppercase English letter represents a ladybug of that color.",
    "A ladybug is happy only when its left or right adjacent cell is occupied by another ladybug having the same color.",
    "In a single move, you can move a ladybug from its current position to any empty cell.",
    "Given the initial board, determine whether it is possible to make all the ladybugs happy. Return YES if all the ladybugs can be made happy, otherwise return NO."
  ],
  examples: [
    {
      input: "b = \"RBY_YBR\"",
      output: "YES",
      explanation:
        "There is an empty cell, and every ladybug color appears at least twice, so the ladybugs can be rearranged so that equal colors are adjacent."
    },
    {
      input: "b = \"X_Y__X\"",
      output: "NO",
      explanation:
        "The color Y appears only once, so that ladybug can never have another Y ladybug next to it."
    },
    {
      input: "b = \"__\"",
      output: "YES",
      explanation:
        "There are no ladybugs, so there are no unhappy ladybugs."
    },
    {
      input: "b = \"B_RRBR\"",
      output: "YES",
      explanation:
        "The empty cell allows the ladybugs to be rearranged so that every ladybug has a same-colored neighbor."
    }
  ],
  constraints: [
    "1 <= g, n <= 100",
    "b[i] is either an uppercase English letter from A to Z or an underscore (_)."
  ],
  solution: [
    "Maintain a frequency array of size 26 to count how many ladybugs of each color appear. Also maintain a boolean value to determine whether the board contains at least one empty cell.",
    "If the board contains an underscore, there is at least one empty cell. This allows the ladybugs to be moved and rearranged, so their current positions no longer matter. In this case, only the frequency of each color matters.",
    "Every color must occur at least twice when an empty cell exists. A ladybug can be happy only if another ladybug of the same color is next to it. Therefore, if any color appears exactly once, that ladybug can never become happy regardless of how the board is rearranged, so the answer is NO.",
    "If every color appears at least twice and there is an empty cell, the ladybugs can be arranged so that identical colors are grouped together. Therefore, the answer is YES.",
    "If there is no empty cell, no ladybug can be moved at all. Therefore, the existing arrangement must already make every ladybug happy.",
    "When there is no empty cell, examine every ladybug individually. For each position, check whether its left neighbor exists and has the same color, or whether its right neighbor exists and has the same color.",
    "If neither neighbor has the same color, that ladybug has no same-colored neighbor and will remain unhappy forever. In that case, return NO.",
    "If every ladybug has at least one same-colored neighbor, the existing arrangement is already valid, so return YES."
  ],
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: {
    cpp: `string happyLadybugs(string b) {

    int freq[26] = {0};
    bool hasEmptyCell = false;

    for (char c : b) {

        if (c == '_') {
            hasEmptyCell = true;
        }
        else {
            freq[c - 'A']++;
        }
    }

    if (hasEmptyCell) {

        for (int i = 0; i < 26; i++) {

            if (freq[i] == 1) {
                return "NO";
            }
        }

        return "YES";
    }

    for (int i = 0; i < b.length(); i++) {

        bool happy = false;

        if (i > 0 && b[i] == b[i - 1]) {
            happy = true;
        }

        if (i < (int)b.length() - 1 &&
            b[i] == b[i + 1]) {
            happy = true;
        }

        if (!happy) {
            return "NO";
        }
    }

    return "YES";
}`,
    python: `def happyLadybugs(b):

    freq = [0] * 26
    has_empty_cell = False

    for c in b:

        if c == '_':
            has_empty_cell = True
        else:
            freq[ord(c) - ord('A')] += 1

    if has_empty_cell:

        for count in freq:

            if count == 1:
                return "NO"

        return "YES"

    for i in range(len(b)):

        happy = False

        if i > 0 and b[i] == b[i - 1]:
            happy = True

        if i < len(b) - 1 and b[i] == b[i + 1]:
            happy = True

        if not happy:
            return "NO"

    return "YES"`,
    java: `public static String happyLadybugs(String b) {

    int[] freq = new int[26];
    boolean hasEmptyCell = false;

    for (char c : b.toCharArray()) {

        if (c == '_') {
            hasEmptyCell = true;
        } else {
            freq[c - 'A']++;
        }
    }

    if (hasEmptyCell) {

        for (int count : freq) {
            if (count == 1) {
                return "NO";
            }
        }

        return "YES";
    }

    for (int i = 0; i < b.length(); i++) {

        boolean happy = false;

        if (i > 0 && b.charAt(i) == b.charAt(i - 1)) {
            happy = true;
        }

        if (i < b.length() - 1 &&
            b.charAt(i) == b.charAt(i + 1)) {
            happy = true;
        }

        if (!happy) {
            return "NO";
        }
    }

    return "YES";
}`,
  },
    },
    {
  slug: "hackerland-radio-transmitters",
  title: "Hackerland Radio Transmitters",
  tags: ["Greedy", "Sorting"],
  difficulty: "Medium",
  acceptanceRate: 100.00,
  statement: [
    "Hackerland is a one-dimensional city with houses aligned at integral locations along a road. The Mayor wants to install radio transmitters on the roofs of the city's houses. Each transmitter has a fixed range meaning it can transmit a signal to all houses within that number of units distance away.",
    "Given a map of Hackerland and the transmission range, determine the minimum number of transmitters so that every house is within range of at least one transmitter. Each transmitter must be installed on top of an existing house.",
    "You are given the locations of the houses and the effective range of each transmitter. Return the minimum number of transmitters needed to cover every house.",
  ],
  examples: [
    {
      input: "n = 5, k = 1, x = [1, 2, 3, 4, 5]",
      output: "2",
      explanation:
        "The entire city can be covered by installing transmitters on houses at two appropriate locations.",
    },
    {
      input: "n = 8, k = 2, x = [7, 2, 4, 6, 5, 9, 12, 11]",
      output: "3",
      explanation:
        "The houses can be completely covered using three transmitters placed on existing houses.",
    },
  ],
  constraints: [
    "1 <= n <= 10^5",
    "1 <= k <= 10^5",
    "0 <= x[i] <= 10^5",
    "There may be more than one house at the same location.",
  ],
  solution: [
    "First, sort the house positions so that they can be processed from left to right. This allows the algorithm to make each greedy decision based on the leftmost house that has not yet been covered.",
    "Let x[i] be the leftmost house that is not covered yet. This house must be covered by the next transmitter, so it determines how far right the transmitter can be placed.",
    "Suppose a transmitter is placed at position p. Its coverage is the interval [p-k, p+k]. To cover the leftmost uncovered house, we need p - k <= leftmost, which is equivalent to p <= leftmost + k.",
    "Move i to the right while x[i] <= leftmost + k. After this loop, i is one position beyond the rightmost house where the transmitter can be placed while still covering the leftmost uncovered house.",
    "Therefore, place the transmitter at x[i - 1], the rightmost possible house. Choosing the rightmost possible position is the greedy choice because it maximizes how far the transmitter can cover toward the remaining houses on the right.",
    "Increment the number of transmitters after choosing this position.",
    "A transmitter placed at transmitterPosition covers every house up to transmitterPosition + k. Continue moving i while x[i] <= transmitterPosition + k, thereby skipping every house already covered by the current transmitter.",
    "Repeat this process while there are still uncovered houses. When i reaches n, every house has been covered and the number of transmitters is the answer.",
    "The sorting step takes O(n log n) time, while the two-pointer-style scan processes every house at most a constant number of times. Therefore, the total time complexity is O(n log n).",
    "The C++ and Java implementations sort the input collection directly, while the Python implementation uses the built-in sort operation. The algorithm otherwise follows the same greedy process in all three languages."
  ],
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(1)",
  code: {
    cpp: `int hackerlandRadioTransmitters(vector<int> x, int k) {

    sort(x.begin(), x.end());

    int n = x.size();
    int i = 0;
    int transmitters = 0;

    while (i < n) {

        int leftmost = x[i];

        while (i < n && x[i] <= leftmost + k) {
            i++;
        }

        int transmitterPosition = x[i - 1];

        transmitters++;

        while (
            i < n &&
            x[i] <= transmitterPosition + k
        ) {
            i++;
        }
    }

    return transmitters;
}`,
    python: `def hackerlandRadioTransmitters(x, k):

    x.sort()

    n = len(x)
    i = 0
    transmitters = 0

    while i < n:

        leftmost = x[i]

        while i < n and x[i] <= leftmost + k:
            i += 1

        transmitter_position = x[i - 1]

        transmitters += 1

        while i < n and x[i] <= transmitter_position + k:
            i += 1

    return transmitters`,
    java: `public static int hackerlandRadioTransmitters(List<Integer> x, int k) {

    Collections.sort(x);

    int n = x.size();
    int i = 0;
    int transmitters = 0;

    while (i < n) {

        int leftmost = x.get(i);

        while (i < n && x.get(i) <= leftmost + k) {
            i++;
        }

        int transmitterPosition = x.get(i - 1);

        transmitters++;

        while (
            i < n &&
            x.get(i) <= transmitterPosition + k
        ) {
            i++;
        }
    }

    return transmitters;
}`,
  },
    },
    {
  slug: "fraudulent-activity-notifications",
  title: "Fraudulent Activity Notifications",
  tags: ["Array", "Median", "Sliding Window", "Counting Sort"],
  difficulty: "Medium",
  acceptanceRate: 50.00,
  statement: [
    "HackerLand National Bank has a simple policy for warning clients about possible fraudulent account activity. If the amount spent by a client on a particular day is greater than or equal to twice the client's median spending for a trailing number of days, the bank sends a notification.",
    "The bank does not send notifications until it has at least the specified number of trailing days of transaction data.",
    "Given the number of trailing days and the client's daily expenditures, determine the total number of notifications sent over the given period.",
    "The median is found by sorting the trailing expenditures. If the number of values is odd, the median is the middle value. If it is even, the median is the average of the two middle values."
  ],
  examples: [
    {
      input: "expenditure = [2, 3, 4, 2, 3, 6, 8, 4, 5], d = 5",
      output: "2",
      explanation:
        "On the sixth day, the trailing expenditures are [2, 3, 4, 2, 3], whose median is 3. Since 6 >= 2 * 3, a notification is sent. On the seventh day, the trailing expenditures are [3, 4, 2, 3, 6], whose median is 3. Since 8 >= 2 * 3, another notification is sent. The remaining days do not trigger notifications."
    },
    {
      input: "expenditure = [1, 2, 3, 4, 4], d = 4",
      output: "0",
      explanation:
        "There are no days where the current expenditure is at least twice the median of the previous four days."
    }
  ],
  constraints: [
    "1 <= d < n <= 2 * 10^5",
    "0 <= expenditure[i] <= 200"
  ],
  solution: [
    "The key observation is that every expenditure value is between 0 and 200. Therefore, instead of sorting the trailing d expenditures on every day, maintain a frequency array of size 201.",
    "The frequency array uses count[x] to store how many times expenditure value x occurs in the current trailing window. Since there are only 201 possible values, finding the median requires scanning at most 201 positions.",
    "The first d expenditures form the initial trailing window, so insert each of them into the frequency array before processing any notifications.",
    "For every day starting at index d, the current trailing window consists of the previous d expenditures. Find twice the median of this window before checking the current day's expenditure.",
    "It is useful to calculate twice the median rather than the actual median because an even-sized window can have a fractional median. This allows the algorithm to avoid floating-point arithmetic completely.",
    "When d is odd, the median is a single middle element. The one-indexed position of this element is d / 2 + 1. Scan the frequency array while maintaining a cumulative count. The first value whose cumulative count reaches this position is the median, so return 2 * value.",
    "For example, if the sorted window is [10, 20, 30], the median is 20 and twice the median is 40.",
    "When d is even, there are two middle elements. Their one-indexed positions are d / 2 and d / 2 + 1. Scan the frequency array to find both values.",
    "For example, if the sorted window is [10, 20, 30, 40], the two middle values are 20 and 30. The median is (20 + 30) / 2 = 25, so twice the median is 20 + 30 = 50.",
    "Once twice the median has been found, compare expenditure[i] directly with twice the median. This is equivalent to checking whether expenditure[i] >= 2 * median while avoiding floating-point calculations.",
    "If expenditure[i] is greater than or equal to twice the median, increment the notification count.",
    "After processing the current day, slide the trailing window forward by one position. Remove expenditure[i - d], which is the oldest value in the current window, and add expenditure[i], which becomes part of the window for the next day.",
    "The old window before the update is [i-d, ..., i-1], while the new window after the update is [i-d+1, ..., i].",
    "Because there are only 201 possible expenditure values, each median lookup takes O(201), which is effectively O(1) with respect to n. Each expenditure is inserted and removed from the frequency array once, so the complete algorithm runs in O(n) time.",
    "The frequency array always has exactly 201 positions regardless of the number of transactions, so the auxiliary space complexity is O(1)."
  ],
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: {
    cpp: `int getTwiceMedian(vector<int>& count, int d) {
    int cumulative = 0;

    if (d % 2 == 1) {
        int middle = d / 2 + 1;

        for (int value = 0; value <= 200; value++) {
            cumulative += count[value];

            if (cumulative >= middle) {
                return 2 * value;
            }
        }
    } else {
        int firstMiddle = d / 2;
        int secondMiddle = d / 2 + 1;

        int first = -1;
        int second = -1;

        for (int value = 0; value <= 200; value++) {
            cumulative += count[value];

            if (first == -1 && cumulative >= firstMiddle) {
                first = value;
            }

            if (cumulative >= secondMiddle) {
                second = value;
                break;
            }
        }

        return first + second;
    }

    return 0;
}

int activityNotifications(vector<int> expenditure, int d) {
    int n = expenditure.size();
    int notifications = 0;

    vector<int> count(201, 0);

    for (int i = 0; i < d; i++) {
        count[expenditure[i]]++;
    }

    for (int i = d; i < n; i++) {
        int twiceMedian = getTwiceMedian(count, d);

        if (expenditure[i] >= twiceMedian) {
            notifications++;
        }

        count[expenditure[i - d]]--;
        count[expenditure[i]]++;
    }

    return notifications;
}`,
    python: `def get_twice_median(count, d):
    cumulative = 0

    if d % 2 == 1:
        middle = d // 2 + 1

        for value in range(201):
            cumulative += count[value]

            if cumulative >= middle:
                return 2 * value
    else:
        first_middle = d // 2
        second_middle = d // 2 + 1

        first = -1
        second = -1

        for value in range(201):
            cumulative += count[value]

            if first == -1 and cumulative >= first_middle:
                first = value

            if cumulative >= second_middle:
                second = value
                break

        return first + second

    return 0


def activityNotifications(expenditure, d):
    n = len(expenditure)
    notifications = 0

    count = [0] * 201

    for i in range(d):
        count[expenditure[i]] += 1

    for i in range(d, n):
        twice_median = get_twice_median(count, d)

        if expenditure[i] >= twice_median:
            notifications += 1

        count[expenditure[i - d]] -= 1
        count[expenditure[i]] += 1

    return notifications`,
    java: `public static int activityNotifications(List<Integer> expenditure, int d) {
    int n = expenditure.size();
    int notifications = 0;

    int[] count = new int[201];

    for (int i = 0; i < d; i++) {
        count[expenditure.get(i)]++;
    }

    for (int i = d; i < n; i++) {
        int twiceMedian = getTwiceMedian(count, d);

        if (expenditure.get(i) >= twiceMedian) {
            notifications++;
        }

        count[expenditure.get(i - d)]--;
        count[expenditure.get(i)]++;
    }

    return notifications;
}

private static int getTwiceMedian(int[] count, int d) {
    int cumulative = 0;

    if (d % 2 == 1) {
        int middle = d / 2 + 1;

        for (int value = 0; value <= 200; value++) {
            cumulative += count[value];

            if (cumulative >= middle) {
                return 2 * value;
            }
        }
    } else {
        int firstMiddle = d / 2;
        int secondMiddle = d / 2 + 1;

        int first = -1;
        int second = -1;

        for (int value = 0; value <= 200; value++) {
            cumulative += count[value];

            if (first == -1 && cumulative >= firstMiddle) {
                first = value;
            }

            if (cumulative >= secondMiddle) {
                second = value;
                break;
            }
        }

        return first + second;
    }

    return 0;
}`
  },
},
    {
  slug: "sherlock-and-anagrams",
  title: "Sherlock and Anagrams",
  tags: ["String", "Hashing", "Frequency Array"],
  difficulty: "Medium",
  acceptanceRate: 100.00,
  statement: [
    "Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string.",
    "Given a string, find the number of pairs of substrings of the string that are anagrams of each other.",
    "The pairs are unordered, meaning a pair of substrings is counted only once regardless of their order."
  ],
  examples: [
    {
      input: "s = \"abba\"",
      output: "4",
      explanation:
        "There are 4 unordered pairs of substrings that are anagrams of each other."
    },
    {
      input: "s = \"abcd\"",
      output: "0",
      explanation:
        "No two substrings form an anagrammatic pair because no character repeats."
    },
    {
      input: "s = \"cdcd\"",
      output: "5",
      explanation:
        "There are two anagrammatic pairs of length 1 and three anagrammatic pairs of length 2."
    }
  ],
  constraints: [
    "1 <= q <= 10",
    "2 <= |s| <= 100",
    "s contains only lowercase English letters in the range ascii[a-z]."
  ],
  solution: [
    "Two substrings are anagrams if and only if their character frequencies are exactly the same. For example, the substrings \"abbc\" and \"bcab\" both contain one 'a', two 'b's, one 'c', and zero occurrences of every other letter, so they have the same frequency signature and are anagrams.",
    "Since the string contains only lowercase English letters, a frequency array of size 26 is sufficient to represent the character composition of any substring. The first position represents the number of 'a' characters, the second represents the number of 'b' characters, and so on through the 26 lowercase letters.",
    "For each starting position i, initialize a frequency array containing zero occurrences of every character. Then extend the substring from i toward the right one character at a time.",
    "When a new character s[j] is included, increment its corresponding position in the frequency array. This updates the signature of the current substring without rebuilding its frequencies from scratch.",
    "For each starting position, maintain a map from the frequency signature to the number of substrings with that signature that have already been encountered.",
    "When the current frequency signature has appeared count times before, the current substring forms count new anagrammatic pairs because it can be paired with each previous substring having the same character frequencies.",
    "Add count to the answer and then increment the stored frequency of the current signature.",
    "For example, if the same signature has already appeared three times, the next occurrence forms three new pairs. Across four occurrences, the total number of pairs is 0 + 1 + 2 + 3 = 6, which is the same as choosing any two of the four matching substrings.",
    "In the C++ implementation, array<int, 26> is used directly as the map key because it represents the complete frequency signature.",
    "In the Python implementation, the frequency list is converted into a tuple because lists are mutable and cannot be used as dictionary keys, while tuples are immutable and hashable.",
    "In the Java implementation, the frequency array is converted into a string using Arrays.toString so that the resulting representation can be used as a HashMap key.",
    "The nested loops generate O(n^2) substrings. Updating the frequency array itself takes O(1), but the implementations also perform signature storage and lookup. The exact practical complexity therefore depends on the map or hash-table operations and the cost of constructing the signature representation."
  ],
  timeComplexity: "O(n^2)",
  spaceComplexity: "O(n^2)",
  code: {
    cpp: `int sherlockAndAnagrams(string s) {

    int n = s.length();
    int answer = 0;

    for (int i = 0; i < n; i++) {

        array<int, 26> freq{};

        map<array<int, 26>, int> mp;

        for (int j = i; j < n; j++) {

            freq[s[j] - 'a']++;

            int count = mp[freq];

            answer += count;

            mp[freq]++;
        }
    }

    return answer;
}`,
    python: `def sherlockAndAnagrams(s):

    n = len(s)
    answer = 0

    for i in range(n):

        freq = [0] * 26

        seen = {}

        for j in range(i, n):

            freq[ord(s[j]) - ord('a')] += 1

            key = tuple(freq)

            count = seen.get(key, 0)

            answer += count

            seen[key] = count + 1

    return answer`,
    java: `public static int sherlockAndAnagrams(String s) {

    int n = s.length();
    int answer = 0;

    for (int i = 0; i < n; i++) {

        int[] freq = new int[26];

        HashMap<String, Integer> map = new HashMap<>();

        for (int j = i; j < n; j++) {

            freq[s.charAt(j) - 'a']++;

            String key = Arrays.toString(freq);

            int count = map.getOrDefault(key, 0);

            answer += count;

            map.put(key, count + 1);
        }
    }

    return answer;
}`,
  },
    },
  ],
};