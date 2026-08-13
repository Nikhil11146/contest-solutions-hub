import type { Contest } from "../types";
import staircaseDiagram from "@/assets/staircase-cost.jpg";

export const contest002: Contest = {
  id: "ascent-weekly-2",
  number: 2,
  title: "Ascent Weekly 2",
  date: "2026-07-12",
  summary:
    "String hashing, a classic dynamic programming ladder and a binary-search-on-answer closer.",
  questions: [
    {
      slug: "rotation-match",
      title: "Rotation Match",
      tags: ["String", "Two Pointers"],
      difficulty: "Easy",
      acceptanceRate: 72.9,
      statement: [
        "Given two strings s and t of equal length, return true if t can be obtained by rotating s any number of positions to the left.",
      ],
      examples: [
        { input: 's = "abcde", t = "cdeab"', output: "true" },
        { input: 's = "abcde", t = "abced"', output: "false" },
      ],
      constraints: ["1 <= s.length == t.length <= 10^5"],
      solution: [
        "Every rotation of s appears as a substring of s + s, and only rotations do.",
        "So the whole check collapses to: lengths match and t is a substring of the doubled string.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: {
        cpp: `bool rotationMatch(const string& s, const string& t) {
    if (s.size() != t.size()) return false;
    return (s + s).find(t) != string::npos;
}`,
        python: `def rotation_match(s: str, t: str) -> bool:
    return len(s) == len(t) and t in (s + s)`,
        java: `boolean rotationMatch(String s, String t) {
    return s.length() == t.length() && (s + s).contains(t);
}`,
      },
    },
    {
      slug: "staircase-cost",
      title: "Staircase Cost",
      tags: ["Dynamic Programming"],
      difficulty: "Medium",
      acceptanceRate: 51.3,
      statement: [
        "A staircase has n steps, each with a cost. From step i you may move to i+1, i+2 or i+3, paying the cost of the step you land on.",
        "You may start at step 0 or step 1. Return the minimum total cost to move past the last step.",
      ],
      examples: [
        { input: "cost = [10, 15, 20]", output: "15" },
        { input: "cost = [1, 100, 1, 1, 100, 1]", output: "3" },
      ],
      constraints: ["2 <= cost.length <= 10^5", "0 <= cost[i] <= 999"],
      solution: [
        "Let dp[i] be the cheapest way to stand on step i. Then dp[i] = cost[i] + min(dp[i-1], dp[i-2], dp[i-3]) with dp[0] = cost[0] and dp[1] = cost[1].",
        "Only the last three values are ever needed, so the table collapses into three rolling variables and constant memory.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      images: [
        {
          src: staircaseDiagram,
          alt: "Staircase illustrating the three possible jump lengths",
          caption: "Each step can be reached from one, two or three steps below.",
        },
      ],
      code: {
        cpp: `int minStaircaseCost(vector<int>& cost) {
    int n = cost.size();
    int a = cost[0], b = cost[1], c = 0;
    if (n == 2) return min(a, b);
    c = cost[2] + min(a, b);
    for (int i = 3; i < n; ++i) {
        int cur = cost[i] + min({a, b, c});
        a = b; b = c; c = cur;
    }
    return min({b, c, n > 2 ? c : a});
}`,
        python: `def min_staircase_cost(cost: list[int]) -> int:
    n = len(cost)
    if n == 2:
        return min(cost)
    a, b, c = cost[0], cost[1], cost[2] + min(cost[0], cost[1])
    for i in range(3, n):
        a, b, c = b, c, cost[i] + min(a, b, c)
    return min(b, c)`,
        java: `int minStaircaseCost(int[] cost) {
    int n = cost.length;
    if (n == 2) return Math.min(cost[0], cost[1]);
    int a = cost[0], b = cost[1], c = cost[2] + Math.min(a, b);
    for (int i = 3; i < n; i++) {
        int cur = cost[i] + Math.min(c, Math.min(a, b));
        a = b; b = c; c = cur;
    }
    return Math.min(b, c);
}`,
      },
    },
    {
      slug: "minimum-shipping-days",
      title: "Minimum Shipping Days",
      tags: ["Binary Search", "Greedy"],
      difficulty: "Hard",
      acceptanceRate: 28.5,
      statement: [
        "Packages must be shipped in order within d days. Each day the ship carries a contiguous prefix of the remaining packages whose total weight does not exceed the ship capacity.",
        "Return the least capacity that lets all packages ship within d days.",
      ],
      examples: [
        { input: "weights = [1,2,3,4,5,6,7,8,9,10], d = 5", output: "15" },
      ],
      constraints: ["1 <= d <= weights.length <= 5 * 10^4", "1 <= weights[i] <= 500"],
      solution: [
        "Feasibility is monotone: if capacity C works, every capacity above C works too. That makes the answer binary-searchable.",
        "The search space runs from max(weights) (a single package must fit) to sum(weights) (everything in one day). For each candidate, greedily fill days and count how many are needed.",
      ],
      timeComplexity: "O(n log(sum))",
      spaceComplexity: "O(1)",
      code: {
        cpp: `bool feasible(vector<int>& w, int cap, int d) {
    int days = 1, cur = 0;
    for (int x : w) {
        if (cur + x > cap) { days++; cur = 0; }
        cur += x;
    }
    return days <= d;
}

int shipWithinDays(vector<int>& w, int d) {
    int lo = *max_element(w.begin(), w.end());
    int hi = accumulate(w.begin(), w.end(), 0);
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (feasible(w, mid, d)) hi = mid; else lo = mid + 1;
    }
    return lo;
}`,
        python: `def ship_within_days(weights: list[int], d: int) -> int:
    def feasible(cap: int) -> bool:
        days, cur = 1, 0
        for x in weights:
            if cur + x > cap:
                days += 1
                cur = 0
            cur += x
        return days <= d

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
        java: `boolean feasible(int[] w, int cap, int d) {
    int days = 1, cur = 0;
    for (int x : w) {
        if (cur + x > cap) { days++; cur = 0; }
        cur += x;
    }
    return days <= d;
}

int shipWithinDays(int[] w, int d) {
    int lo = 0, hi = 0;
    for (int x : w) { lo = Math.max(lo, x); hi += x; }
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (feasible(w, mid, d)) hi = mid; else lo = mid + 1;
    }
    return lo;
}`,
      },
    },
  ],
};
