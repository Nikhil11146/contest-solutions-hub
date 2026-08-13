import type { Contest } from "../types";

export const contest001: Contest = {
  id: "ascent-weekly-1",
  number: 1,
  title: "Ascent Weekly 1",
  date: "2026-07-05",
  summary:
    "The opening round: array warm-ups, a greedy interval problem and a graph traversal finisher.",
  questions: [
    {
      slug: "balanced-split",
      title: "Balanced Split",
      tags: ["Array", "Prefix Sum"],
      difficulty: "Easy",
      acceptanceRate: 68.4,
      statement: [
        "You are given an integer array nums. Find the smallest index i such that the sum of nums[0..i] equals the sum of nums[i+1..n-1].",
        "If no such index exists, return -1.",
      ],
      examples: [
        {
          input: "nums = [1, 2, 3, 3, 3]",
          output: "2",
          explanation: "1 + 2 + 3 = 6 and 3 + 3 = 6.",
        },
        { input: "nums = [1, 2]", output: "-1" },
      ],
      constraints: ["2 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
      solution: [
        "Compute the total sum of the array once. Then sweep left to right keeping a running prefix sum.",
        "At index i the suffix sum is total - prefix. The first index where prefix equals total - prefix is the answer, so a single pass after the total is enough.",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: {
        cpp: `int balancedSplit(vector<int>& nums) {
    long long total = 0;
    for (int v : nums) total += v;
    long long prefix = 0;
    for (int i = 0; i + 1 < (int)nums.size(); ++i) {
        prefix += nums[i];
        if (prefix == total - prefix) return i;
    }
    return -1;
}`,
        python: `def balanced_split(nums: list[int]) -> int:
    total = sum(nums)
    prefix = 0
    for i in range(len(nums) - 1):
        prefix += nums[i]
        if prefix == total - prefix:
            return i
    return -1`,
        java: `int balancedSplit(int[] nums) {
    long total = 0;
    for (int v : nums) total += v;
    long prefix = 0;
    for (int i = 0; i + 1 < nums.length; i++) {
        prefix += nums[i];
        if (prefix == total - prefix) return i;
    }
    return -1;
}`,
      },
    },
    {
      slug: "meeting-rooms-lite",
      title: "Meeting Rooms Lite",
      tags: ["Greedy", "Sorting", "Intervals"],
      difficulty: "Medium",
      acceptanceRate: 44.1,
      statement: [
        "Given a list of meeting intervals [start, end), return the minimum number of rooms required so that no two meetings in the same room overlap.",
      ],
      examples: [
        { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
        { input: "intervals = [[7,10],[2,4]]", output: "1" },
      ],
      constraints: ["1 <= intervals.length <= 10^5", "0 <= start < end <= 10^9"],
      solution: [
        "Treat every start as +1 and every end as -1 on a timeline. Sort all events by time, processing ends before starts when they tie (a room frees up exactly when the next meeting begins).",
        "Sweep through the events keeping a running counter; the maximum value the counter reaches is the number of rooms needed.",
      ],
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      code: {
        cpp: `int minRooms(vector<vector<int>>& intervals) {
    vector<pair<int,int>> events;
    for (auto& it : intervals) {
        events.push_back({it[0], 1});
        events.push_back({it[1], -1});
    }
    sort(events.begin(), events.end());
    int cur = 0, best = 0;
    for (auto& [t, d] : events) {
        cur += d;
        best = max(best, cur);
    }
    return best;
}`,
        python: `def min_rooms(intervals: list[list[int]]) -> int:
    events = []
    for start, end in intervals:
        events.append((start, 1))
        events.append((end, -1))
    events.sort()
    cur = best = 0
    for _, delta in events:
        cur += delta
        best = max(best, cur)
    return best`,
        java: `int minRooms(int[][] intervals) {
    int[][] events = new int[intervals.length * 2][2];
    int k = 0;
    for (int[] it : intervals) {
        events[k++] = new int[]{it[0], 1};
        events[k++] = new int[]{it[1], -1};
    }
    Arrays.sort(events, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
    int cur = 0, best = 0;
    for (int[] e : events) {
        cur += e[1];
        best = Math.max(best, cur);
    }
    return best;
}`,
      },
    },
    {
      slug: "island-perimeter-walk",
      title: "Island Perimeter Walk",
      tags: ["Graph", "BFS", "Matrix"],
      difficulty: "Hard",
      acceptanceRate: 21.7,
      statement: [
        "You are given a binary grid where 1 marks land and 0 marks water. Exactly one connected landmass exists, possibly containing lakes (water fully enclosed by land).",
        "Return the perimeter of the outer boundary only — edges facing an enclosed lake do not count.",
      ],
      examples: [
        { input: "grid = [[1,1,1],[1,0,1],[1,1,1]]", output: "12" },
      ],
      constraints: ["1 <= rows, cols <= 500"],
      solution: [
        "Flood fill the outside water starting from every border cell. Any water cell reached this way is exterior; everything else is a lake.",
        "Then scan all land cells and count the sides that touch either exterior water or the grid boundary. Lake-facing sides are skipped because those water cells were never marked exterior.",
      ],
      timeComplexity: "O(rows * cols)",
      spaceComplexity: "O(rows * cols)",
      code: {
        cpp: `int outerPerimeter(vector<vector<int>>& g) {
    int n = g.size(), m = g[0].size();
    vector<vector<int>> out(n, vector<int>(m, 0));
    queue<pair<int,int>> q;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            if ((i == 0 || j == 0 || i == n-1 || j == m-1) && g[i][j] == 0 && !out[i][j]) {
                out[i][j] = 1; q.push({i, j});
            }
    int dx[] = {1,-1,0,0}, dy[] = {0,0,1,-1};
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int d = 0; d < 4; ++d) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            if (g[nx][ny] || out[nx][ny]) continue;
            out[nx][ny] = 1; q.push({nx, ny});
        }
    }
    int per = 0;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j) {
            if (!g[i][j]) continue;
            for (int d = 0; d < 4; ++d) {
                int nx = i + dx[d], ny = j + dy[d];
                if (nx < 0 || ny < 0 || nx >= n || ny >= m || out[nx][ny]) per++;
            }
        }
    return per;
}`,
        python: `from collections import deque

def outer_perimeter(g: list[list[int]]) -> int:
    n, m = len(g), len(g[0])
    out = [[False] * m for _ in range(n)]
    q = deque()
    for i in range(n):
        for j in range(m):
            border = i in (0, n - 1) or j in (0, m - 1)
            if border and g[i][j] == 0 and not out[i][j]:
                out[i][j] = True
                q.append((i, j))
    dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))
    while q:
        x, y = q.popleft()
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if 0 <= nx < n and 0 <= ny < m and not g[nx][ny] and not out[nx][ny]:
                out[nx][ny] = True
                q.append((nx, ny))
    per = 0
    for i in range(n):
        for j in range(m):
            if not g[i][j]:
                continue
            for dx, dy in dirs:
                nx, ny = i + dx, j + dy
                if not (0 <= nx < n and 0 <= ny < m) or out[nx][ny]:
                    per += 1
    return per`,
        java: `int outerPerimeter(int[][] g) {
    int n = g.length, m = g[0].length;
    boolean[][] out = new boolean[n][m];
    Deque<int[]> q = new ArrayDeque<>();
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if ((i == 0 || j == 0 || i == n-1 || j == m-1) && g[i][j] == 0 && !out[i][j]) {
                out[i][j] = true; q.add(new int[]{i, j});
            }
    int[] dx = {1,-1,0,0}, dy = {0,0,1,-1};
    while (!q.isEmpty()) {
        int[] c = q.poll();
        for (int d = 0; d < 4; d++) {
            int nx = c[0] + dx[d], ny = c[1] + dy[d];
            if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            if (g[nx][ny] == 1 || out[nx][ny]) continue;
            out[nx][ny] = true; q.add(new int[]{nx, ny});
        }
    }
    int per = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            if (g[i][j] == 0) continue;
            for (int d = 0; d < 4; d++) {
                int nx = i + dx[d], ny = j + dy[d];
                if (nx < 0 || ny < 0 || nx >= n || ny >= m || out[nx][ny]) per++;
            }
        }
    return per;
}`,
      },
    },
  ],
};
