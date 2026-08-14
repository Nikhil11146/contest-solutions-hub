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
  acceptanceRate: 0,
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
    "Each person shakes hands with every other person, so each person initially contributes n - 1 possible handshakes.",
    "This counts every handshake twice, once for each person involved.",
    "Therefore, the number of unique handshakes is n * (n - 1) / 2, which is also the combination nC2."
  ],
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  code: {
    cpp: `int handshakes(int n) {
    // Each person can shake hands with (n - 1) people.
    // By combination formula, the number of ways to choose 2 people from n is nC2 = n! / (2! * (n - 2)!) = n * (n - 1) / 2
    return n * (n - 1) / 2;
}`,
    python: `def handshakes(n):
    # Each person shakes hands with (n - 1) people.
    # By combination formula, the number of ways to choose 2 people from n is nC2 = n! / (2! * (n - 2)!) = n * (n - 1) / 2
    return n * (n - 1) // 2`,
    java: `public static int handshakes(int n) {
    // Each person shakes hands with (n - 1) other people.
    // By combination formula, the number of ways to choose 2 people from n is nC2 = n! / (2! * (n - 2)!) = n * (n - 1) / 2
    return n * (n - 1) / 2;
}`,
  },
    },
    {
  slug: "happy-ladybugs",
  title: "Happy Ladybugs",
  tags: ["Greedy", "String", "Counting"],
  difficulty: "Easy",
  acceptanceRate: 0,
  statement: [
    "Happy Ladybugs is a board game represented by a string b of length n. Each character represents a cell on the board.",
    "An underscore (_) represents an empty cell. An uppercase English letter represents a ladybug of that color.",
    "A ladybug is happy only when its left or right adjacent cell is occupied by another ladybug having the same color.",
    "In a single move, you can move a ladybug from its current position to any empty cell.",
    "Given the initial board, determine whether it is possible to make all the ladybugs happy. Return YES if all ladybugs can be made happy, otherwise return NO."
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
    "Count how many times each ladybug color occurs and determine whether the board contains an empty cell.",
    "If there is at least one empty cell, the current arrangement does not matter because ladybugs can be rearranged.",
    "With an empty cell, every color must occur at least twice. If any color occurs exactly once, that ladybug can never become happy, so return NO. Otherwise return YES.",
    "If there is no empty cell, no ladybug can be moved. Therefore, the existing arrangement must already make every ladybug happy.",
    "Scan every position and check whether its left or right neighbor has the same color. If any ladybug has no same-colored neighbor, return NO. Otherwise return YES."
  ],
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: {
    cpp: `string happyLadybugs(string b) {

    int freq[26] = {0};
    bool hasEmptyCell = false;

    // ---------------------------------------------------------
    // Observation 1:
    // If '_' exists, we have at least one empty cell.
    //
    // This allows us to move ladybugs and rearrange them.
    // Therefore, the current positions of the ladybugs do not
    // matter anymore.
    //
    // The important thing is the frequency of each color.
    // ---------------------------------------------------------

    for (char c : b) {

        if (c == '_') {
            hasEmptyCell = true;
        }
        else {
            freq[c - 'A']++;
        }
    }

    // ---------------------------------------------------------
    // Why must every color occur at least twice?
    //
    // A ladybug becomes happy only if another ladybug of the
    // SAME color is next to it.
    //
    // Therefore, if some color appears exactly once, that
    // ladybug can never become happy, regardless of how we
    // rearrange the board.
    //
    // If every color appears at least twice, we can arrange
    // identical colors together using the empty cells.
    // ---------------------------------------------------------

    if (hasEmptyCell) {

        for (int i = 0; i < 26; i++) {

            if (freq[i] == 1) {
                return "NO";
            }
        }

        return "YES";
    }

    // ---------------------------------------------------------
    // Observation 2:
    // There is no '_' here.
    //
    // That means there is no empty cell, so NO ladybug can be
    // moved at all.
    //
    // Hence, the given arrangement must already make every
    // ladybug happy.
    // ---------------------------------------------------------

    for (int i = 0; i < b.length(); i++) {

        bool happy = false;

        // Check the left neighbor.
        if (i > 0 && b[i] == b[i - 1]) {
            happy = true;
        }

        // Check the right neighbor.
        if (i < (int)b.length() - 1 &&
            b[i] == b[i + 1]) {
            happy = true;
        }

        // This ladybug has no same-colored neighbor.
        if (!happy) {
            return "NO";
        }
    }

    return "YES";
}`,
    python: `def happyLadybugs(b):

    freq = [0] * 26
    has_empty_cell = False

    # ---------------------------------------------------------
    # Observation 1:
    # If '_' exists, we have an empty cell.
    #
    # This means we can move ladybugs around and rearrange
    # their positions.
    #
    # Therefore, when '_' exists, the current arrangement
    # doesn't matter. We only need to consider how many
    # ladybugs of each color we have.
    # ---------------------------------------------------------

    for c in b:

        if c == '_':
            has_empty_cell = True
        else:
            freq[ord(c) - ord('A')] += 1

    # ---------------------------------------------------------
    # Why does every color need to appear at least twice?
    #
    # A ladybug is happy only when it has another ladybug
    # of the SAME color next to it.
    #
    # Therefore, a color appearing exactly once can never
    # be made happy.
    #
    # If every color appears at least twice, we can use the
    # empty cells to arrange equal colors together.
    # ---------------------------------------------------------

    if has_empty_cell:

        for count in freq:

            if count == 1:
                return "NO"

        return "YES"

    # ---------------------------------------------------------
    # Observation 2:
    # There is no '_' in the board.
    #
    # Without an empty cell, we cannot move any ladybug.
    # So the current arrangement must already be valid.
    #
    # For every ladybug, check whether its left or right
    # neighbor has the same color.
    # ---------------------------------------------------------

    for i in range(len(b)):

        happy = False

        # Check the left neighbor.
        if i > 0 and b[i] == b[i - 1]:
            happy = True

        # Check the right neighbor.
        if i < len(b) - 1 and b[i] == b[i + 1]:
            happy = True

        # This ladybug has no same-colored neighbor.
        if not happy:
            return "NO"

    return "YES"`,
    java: `public static String happyLadybugs(String b) {

    int[] freq = new int[26];
    boolean hasEmptyCell = false;

    // ---------------------------------------------------------
    // Observation 1:
    // If there is an empty cell '_', we can rearrange the
    // ladybugs by moving them into empty positions.
    //
    // So, when '_' exists, the exact current arrangement does
    // not matter. We only need to make sure that every color
    // has at least two ladybugs.
    //
    // Why at least two?
    // A ladybug is happy only when it has another ladybug of
    // the same color next to it. Therefore, a color appearing
    // only once can NEVER become happy.
    // ---------------------------------------------------------

    for (char c : b.toCharArray()) {

        if (c == '_') {
            hasEmptyCell = true;
        } else {
            freq[c - 'A']++;
        }
    }

    // ---------------------------------------------------------
    // If there is an empty cell, check the frequency of every
    // ladybug color.
    //
    // Any color with frequency 1 is impossible to make happy.
    // Colors with frequency >= 2 can be grouped together.
    // ---------------------------------------------------------

    if (hasEmptyCell) {

        for (int count : freq) {
            if (count == 1) {
                return "NO";
            }
        }

        return "YES";
    }

    // ---------------------------------------------------------
    // Observation 2:
    // If there is NO empty cell, we cannot move any ladybug.
    //
    // Therefore, the current arrangement itself must already
    // have every ladybug happy.
    //
    // For each position, check whether the ladybug has an
    // identical neighbor on either side.
    // ---------------------------------------------------------

    for (int i = 0; i < b.length(); i++) {

        boolean happy = false;

        // Check the left neighbor.
        if (i > 0 && b.charAt(i) == b.charAt(i - 1)) {
            happy = true;
        }

        // Check the right neighbor.
        if (i < b.length() - 1 &&
            b.charAt(i) == b.charAt(i + 1)) {
            happy = true;
        }

        // If neither neighbor has the same color,
        // this ladybug will remain unhappy forever.
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
      acceptanceRate: 0,
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
        "First, sort the house positions so that they can be processed from left to right.",
        "Take the leftmost house that is not covered yet. The next transmitter must cover this house.",
        "Move as far right as possible while the transmitter can still cover the leftmost uncovered house. Place the transmitter at the rightmost house reached during this step.",
        "Because the transmitter is placed as far right as possible, it covers the maximum possible number of remaining houses on the right.",
        "Finally, skip every house covered by that transmitter and repeat until all houses are covered.",
      ],
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      code: {
        cpp: `int hackerlandRadioTransmitters(vector<int> x, int k) {

    // ---------------------------------------------------------
    // First, sort the house positions.
    //
    // Once the houses are sorted, we can process them from
    // left to right and make greedy decisions.
    // ---------------------------------------------------------

    sort(x.begin(), x.end());

    int n = x.size();
    int i = 0;
    int transmitters = 0;

    while (i < n) {

        // -----------------------------------------------------
        // Step 1:
        // x[i] is the leftmost house that is not covered yet.
        //
        // This house MUST be covered by the next transmitter.
        // -----------------------------------------------------

        int leftmost = x[i];

        // -----------------------------------------------------
        // Step 2:
        // Find the rightmost house where we can place a
        // transmitter while still covering 'leftmost'.
        //
        // If the transmitter is placed at position p, its
        // coverage is:
        //
        //             [p-k, p+k]
        //
        // To cover 'leftmost':
        //
        //             p - k <= leftmost
        //
        // Therefore:
        //
        //             p <= leftmost + k
        //
        // We choose the RIGHTMOST possible house because this
        // gives the transmitter maximum coverage towards the
        // remaining houses on the right.
        // -----------------------------------------------------

        while (i < n && x[i] <= leftmost + k) {
            i++;
        }

        // i is now one position beyond the rightmost possible
        // transmitter position.

        int transmitterPosition = x[i - 1];

        transmitters++;

        // -----------------------------------------------------
        // Step 3:
        // The transmitter at 'transmitterPosition' covers all
        // houses up to:
        //
        //             transmitterPosition + k
        //
        // Skip all houses covered by this transmitter.
        // -----------------------------------------------------

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

    # ---------------------------------------------------------
    # First, sort the house positions.
    #
    # This allows us to process the houses from left to right
    # and make our greedy choices in order.
    # ---------------------------------------------------------

    x.sort()

    n = len(x)
    i = 0
    transmitters = 0

    while i < n:

        # -----------------------------------------------------
        # Step 1:
        # x[i] is the leftmost house that has not been covered.
        #
        # This house must be covered by the next transmitter.
        # -----------------------------------------------------

        leftmost = x[i]

        # -----------------------------------------------------
        # Step 2:
        # Find the rightmost house where we can place a
        # transmitter while still covering 'leftmost'.
        #
        # A transmitter at position p covers:
        #
        #             [p-k, p+k]
        #
        # To cover 'leftmost':
        #
        #             p - k <= leftmost
        #
        # Therefore:
        #
        #             p <= leftmost + k
        #
        # We choose the rightmost possible position because
        # this gives us the maximum coverage towards the right.
        # -----------------------------------------------------

        while i < n and x[i] <= leftmost + k:
            i += 1

        # i is now one position beyond the rightmost possible
        # transmitter position.

        transmitter_position = x[i - 1]

        transmitters += 1

        # -----------------------------------------------------
        # Step 3:
        # The transmitter covers every house up to:
        #
        #             transmitter_position + k
        #
        # Skip all houses covered by this transmitter.
        # -----------------------------------------------------

        while i < n and x[i] <= transmitter_position + k:
            i += 1

    return transmitters`,
        java: `public static int hackerlandRadioTransmitters(List<Integer> x, int k) {

    // ---------------------------------------------------------
    // First, sort the house positions.
    //
    // Sorting allows us to process the houses from left to
    // right and greedily decide where each transmitter should
    // be placed.
    // ---------------------------------------------------------

    Collections.sort(x);

    int n = x.size();
    int i = 0;
    int transmitters = 0;

    while (i < n) {

        // -----------------------------------------------------
        // Step 1:
        // x[i] is the leftmost house that is not covered yet.
        //
        // We MUST place some transmitter that covers x[i].
        // -----------------------------------------------------

        int leftmost = x.get(i);

        // -----------------------------------------------------
        // Step 2:
        // Move as far right as possible while still being able
        // to cover the leftmost house.
        //
        // A transmitter has range k, so if we place it at
        // position p, it covers:
        //
        //             [p-k, p+k]
        //
        // To cover leftmost, we need:
        //
        //             p - k <= leftmost
        //
        // which means:
        //
        //             p <= leftmost + k
        //
        // Therefore, we place the transmitter at the RIGHTMOST
        // house whose position is <= leftmost + k.
        //
        // Why rightmost?
        // Because placing it farther right allows the same
        // transmitter to cover more houses on the right.
        // -----------------------------------------------------

        while (i < n && x.get(i) <= leftmost + k) {
            i++;
        }

        // i is now one position past the rightmost house where
        // we could place the transmitter.
        //
        // So the actual transmitter is placed at i - 1.

        int transmitterPosition = x.get(i - 1);

        transmitters++;

        // -----------------------------------------------------
        // Step 3:
        // Now this transmitter covers everything up to:
        //
        // transmitterPosition + k
        //
        // Skip all houses that are covered by this transmitter.
        // -----------------------------------------------------

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
    acceptanceRate: 0,
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
        explanation: "On the sixth day, the trailing expenditures are [2, 3, 4, 2, 3], whose median is 3. Since 6 >= 2 * 3, a notification is sent. On the seventh day, the trailing expenditures are [3, 4, 2, 3, 6], whose median is 3. Since 8 >= 2 * 3, another notification is sent. The remaining days do not trigger notifications."
        },
        {
        input: "expenditure = [1, 2, 3, 4, 4], d = 4",
        output: "0",
        explanation: "There are no days where the current expenditure is at least twice the median of the previous four days."
        }
    ],
    constraints: [
        "1 <= d < n <= 2 * 10^5",
        "0 <= expenditure[i] <= 200"
    ],
    solution: [
        "Because every expenditure value is between 0 and 200, maintain a frequency array where count[x] stores how many times expenditure x occurs in the current trailing window.",
        "Initialize the frequency array using the first d expenditures. These values form the initial trailing window.",
        "For each subsequent day, find twice the median by scanning the frequency array. If d is odd, find the single middle value and return twice that value. If d is even, find the two middle values and return their sum, which is equal to twice the median.",
        "Compare the current day's expenditure multiplied by 2 with twice the median. If it is greater than or equal to the doubled median, increment the notification count.",
        "Slide the window forward by removing the oldest expenditure from the frequency array and adding the current expenditure.",
        "Since there are only 201 possible expenditure values, finding the median takes O(201), which is effectively O(1). The complete algorithm therefore runs in O(n) time."
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: {
        cpp: `// -------------------------------------------------------------
    // Returns 2 * median of the current trailing window.
    //
    // We return twice the median so that we never need to use
    // floating-point numbers.
    //
    // For odd d:
    //
    //     median = middle element
    //     2 * median = 2 * middle
    //
    // For even d:
    //
    //     median = (firstMiddle + secondMiddle) / 2
    //
    // Therefore:
    //
    //     2 * median = firstMiddle + secondMiddle
    // -------------------------------------------------------------

    int getTwiceMedian(vector<int>& count, int d) {

        int cumulative = 0;

        // ---------------------------------------------------------
        // Case 1: d is odd.
        //
        // Example:
        //
        //     [10, 20, 30]
        //
        // Median = 20
        //
        // The middle element is at position:
        //
        //     d / 2 + 1
        // ---------------------------------------------------------

        if (d % 2 == 1) {

            int middle = d / 2 + 1;

            for (int value = 0; value <= 200; value++) {

                cumulative += count[value];

                if (cumulative >= middle) {
                    return 2 * value;
                }
            }
        }

        // ---------------------------------------------------------
        // Case 2: d is even.
        //
        // Example:
        //
        //     [10, 20, 30, 40]
        //
        // Middle values = 20 and 30
        //
        // Median = (20 + 30) / 2
        //
        // Therefore:
        //
        // 2 * median = 20 + 30
        // ---------------------------------------------------------

        else {

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

        // ---------------------------------------------------------
        // Important observation:
        //
        // Every expenditure is between 0 and 200.
        //
        // So instead of sorting the trailing d values every day,
        // we maintain their frequencies.
        //
        // count[x] = number of times x occurs in the current window.
        //
        // Since there are only 201 possible values, finding the
        // median requires checking at most 201 values.
        // ---------------------------------------------------------

        vector<int> count(201, 0);

        // ---------------------------------------------------------
        // Put the first d expenditures into the frequency array.
        //
        // These form the initial trailing window.
        // ---------------------------------------------------------

        for (int i = 0; i < d; i++) {
            count[expenditure[i]]++;
        }

        // ---------------------------------------------------------
        // Start processing from day d because the first d days
        // are only used as historical data.
        // ---------------------------------------------------------

        for (int i = d; i < n; i++) {

            int twiceMedian = getTwiceMedian(count, d);

            // -----------------------------------------------------
            // Instead of:
            //
            //     expenditure[i] >= 2 * median
            //
            // we compare:
            //
            //     expenditure[i] * 2 >= 2 * median
            //
            // This also avoids floating-point calculations.
            // -----------------------------------------------------

            if (expenditure[i] * 2 >= twiceMedian) {
                notifications++;
            }

            // -----------------------------------------------------
            // Slide the window:
            //
            // Remove the oldest value.
            // Add today's value.
            //
            // Old window:
            //     [i-d, ..., i-1]
            //
            // New window:
            //     [i-d+1, ..., i]
            // -----------------------------------------------------

            count[expenditure[i - d]]--;
            count[expenditure[i]]++;
        }

        return notifications;
    }`,
        python: `def get_twice_median(count, d):

        cumulative = 0

        # ---------------------------------------------------------
        # Case 1: d is odd.
        #
        # Example:
        #
        #     [10, 20, 30]
        #
        # Median = 20
        #
        # The middle element is at position:
        #
        #     d // 2 + 1
        # ---------------------------------------------------------

        if d % 2 == 1:

            middle = d // 2 + 1

            for value in range(201):

                cumulative += count[value]

                if cumulative >= middle:
                    return 2 * value

        # ---------------------------------------------------------
        # Case 2: d is even.
        #
        # Example:
        #
        #     [10, 20, 30, 40]
        #
        # The two middle values are 20 and 30.
        #
        # Median = (20 + 30) / 2
        #
        # Therefore:
        #
        #     2 * median = 20 + 30
        # ---------------------------------------------------------

        else:

            first_middle = d // 2
            second_middle = d // 2 + 1

            first = -1
            second = -1

            for value in range(201):

                cumulative += count[value]

                # Find the first middle value.
                if first == -1 and cumulative >= first_middle:
                    first = value

                # Find the second middle value.
                if cumulative >= second_middle:
                    second = value
                    break

            return first + second


    def activityNotifications(expenditure, d):

        n = len(expenditure)
        notifications = 0

        # ---------------------------------------------------------
        # Important observation:
        #
        # Expenditure values are between 0 and 200.
        #
        # Therefore, instead of sorting the trailing d values for
        # every day, we maintain a frequency array.
        #
        # count[x] = number of occurrences of x in the current
        #            trailing window.
        # ---------------------------------------------------------

        count = [0] * 201

        # ---------------------------------------------------------
        # The first d days only provide historical data.
        # Put them into the initial frequency array.
        # ---------------------------------------------------------

        for i in range(d):
            count[expenditure[i]] += 1

        # ---------------------------------------------------------
        # Start checking from day d.
        #
        # For each day:
        #
        #     1. Find the median of the previous d days.
        #     2. Check today's expenditure.
        #     3. Slide the window forward.
        # ---------------------------------------------------------

        for i in range(d, n):

            twice_median = get_twice_median(count, d)

            # -----------------------------------------------------
            # The condition is:
            #
            #     expenditure[i] >= 2 * median
            #
            # We already calculated 2 * median, so we can simply
            # compare:
            #
            #     2 * expenditure[i] >= 2 * median
            #
            # This avoids floating-point calculations completely.
            # -----------------------------------------------------

            if expenditure[i] * 2 >= twice_median:
                notifications += 1

            # -----------------------------------------------------
            # Slide the window:
            #
            # Remove the oldest expenditure.
            # Add today's expenditure.
            #
            # Old window:
            #     [i-d, ..., i-1]
            #
            # New window:
            #     [i-d+1, ..., i]
            # -----------------------------------------------------

            count[expenditure[i - d]] -= 1
            count[expenditure[i]] += 1

        return notifications`,
        java: `public static int activityNotifications(List<Integer> expenditure, int d) {

        // ---------------------------------------------------------
        // Observation:
        // The expenditure values are between 0 and 200.
        //
        // Therefore, instead of storing the trailing values in a
        // normal sorted array, we can maintain a frequency array.
        //
        // count[x] = number of times expenditure value x occurs
        //            in the current trailing window.
        //
        // This allows us to find the median without actually
        // sorting the window every time.
        // ---------------------------------------------------------

        int n = expenditure.size();
        int notifications = 0;

        int[] count = new int[201];

        // ---------------------------------------------------------
        // Initially, put the first d days into the frequency array.
        //
        // These are the first trailing d days. No notification can
        // be sent yet because we don't have d previous days of data.
        // ---------------------------------------------------------

        for (int i = 0; i < d; i++) {
            count[expenditure.get(i)]++;
        }

        // ---------------------------------------------------------
        // Now start checking from day d.
        //
        // For day i:
        //
        //     trailing window = [i-d, ..., i-1]
        //
        // We find the median of this window and check whether:
        //
        //     expenditure[i] >= 2 * median
        //
        // ---------------------------------------------------------

        for (int i = d; i < n; i++) {

            // Find 2 * median instead of the actual median.
            //
            // This is useful because when d is even, the median
            // can be a decimal value.
            //
            // Example:
            //     [10, 20, 30, 40]
            //
            // Median = (20 + 30) / 2 = 25
            //
            // Therefore:
            //     2 * median = 50
            //
            // We can directly compare expenditure[i] with 50
            // and completely avoid floating-point arithmetic.

            int twiceMedian = getTwiceMedian(count, d);

            // -----------------------------------------------------
            // If today's expenditure is at least twice the median,
            // the bank sends a notification.
            // -----------------------------------------------------

            if (expenditure.get(i) * 2 >= twiceMedian) {
                notifications++;
            }

            // -----------------------------------------------------
            // Sliding window:
            //
            // After processing day i, the window must move one
            // position to the right.
            //
            // Remove the oldest expenditure:
            //
            //     expenditure[i-d]
            //
            // and add today's expenditure:
            //
            //     expenditure[i]
            //
            // This gives us the correct trailing window for the
            // next day.
            // -----------------------------------------------------

            count[expenditure.get(i - d)]--;
            count[expenditure.get(i)]++;
        }

        return notifications;
    }


    // -------------------------------------------------------------
    // Returns 2 * median of the current window.
    //
    // There are two cases:
    //
    // 1. d is odd
    //    Median is the single middle value.
    //
    //    Example:
    //        [10, 20, 30]
    //
    //    Median = 20
    //    2 * median = 40
    //
    // 2. d is even
    //    Median is the average of the two middle values.
    //
    //    Example:
    //        [10, 20, 30, 40]
    //
    //    Median = (20 + 30) / 2
    //    2 * median = 20 + 30 = 50
    //
    // So we can return the doubled median directly.
    // -------------------------------------------------------------

    private static int getTwiceMedian(int[] count, int d) {

        int cumulative = 0;

        if (d % 2 == 1) {

            // Position of the middle element.
            int middle = d / 2 + 1;

            for (int value = 0; value <= 200; value++) {

                cumulative += count[value];

                if (cumulative >= middle) {
                    return 2 * value;
                }
            }

        } else {

            // For an even number of elements, we need the
            // two middle elements.
            //
            // Example for d = 6:
            //
            // positions:
            //     1 2 3 4 5 6
            //
            // middle elements are positions 3 and 4.
            //
            // Therefore we find:
            //     d/2
            //     d/2 + 1

            int firstMiddle = d / 2;
            int secondMiddle = d / 2 + 1;

            int first = -1;
            int second = -1;

            for (int value = 0; value <= 200; value++) {

                cumulative += count[value];

                // Find the first middle value.
                if (first == -1 && cumulative >= firstMiddle) {
                    first = value;
                }

                // Find the second middle value.
                if (cumulative >= secondMiddle) {
                    second = value;
                    break;
                }
            }

            // Since:
            //
            // median = (first + second) / 2
            //
            // therefore:
            //
            // 2 * median = first + second

            return first + second;
        }

        return 0;
    }`,
    },
    },
    {
  slug: "sherlock-and-anagrams",
  title: "Sherlock and Anagrams",
  tags: ["String", "Hashing", "Frequency Array"],
  difficulty: "Medium",
  acceptanceRate: 0,
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
    "Two substrings are anagrams if and only if their character frequencies are identical.",
    "Fix the starting position of a substring and extend it one character at a time. Maintain a frequency array of 26 characters instead of rebuilding the frequency array for every substring.",
    "Use the frequency array as the signature of each substring. Store how many times each signature has already appeared.",
    "When the current signature has already appeared count times, the current substring forms count new anagrammatic pairs with those previous substrings. Add count to the answer and then increment the stored frequency.",
    "The C++ implementation uses array<int, 26> as the map key, while the Java and Python implementations convert the frequency array into a string or tuple respectively."
  ],
  timeComplexity: "O(n^2)",
  spaceComplexity: "O(n^2)",
  code: {
    cpp: `int sherlockAndAnagrams(string s) {

    int n = s.length();
    int answer = 0;

    // ---------------------------------------------------------
    // Observation:
    //
    // Two substrings are anagrams if their character frequencies
    // are exactly the same.
    //
    // For example:
    //
    //     "abbc" -> a:1, b:2, c:1
    //     "bcab" -> a:1, b:2, c:1
    //
    // So instead of sorting every substring, we can use the
    // 26 character frequencies as the identity/signature of
    // a substring.
    // ---------------------------------------------------------

    for (int i = 0; i < n; i++) {

        // Frequency array for the current substring.
        //
        // freq[0] -> number of 'a'
        // freq[1] -> number of 'b'
        // ...
        // freq[25] -> number of 'z'

        array<int, 26> freq{};

        // -----------------------------------------------------
        // Map:
        //
        // frequency signature -> number of times we have already
        // seen that signature.
        //
        // array<int,26> can be used directly as a map key in C++.
        // -----------------------------------------------------

        map<array<int, 26>, int> mp;

        // -----------------------------------------------------
        // Fix the starting point i and extend the substring
        // towards the right.
        //
        // Instead of calculating the frequency from scratch for
        // every substring, we simply add the newly included
        // character.
        // -----------------------------------------------------

        for (int j = i; j < n; j++) {

            freq[s[j] - 'a']++;

            // -------------------------------------------------
            // If this frequency signature has appeared before,
            // every previous substring with the same signature
            // forms an anagrammatic pair with the current one.
            // -------------------------------------------------

            int count = mp[freq];

            answer += count;

            // Record the current substring.
            mp[freq]++;
        }
    }

    return answer;
}`,
    python: `def sherlockAndAnagrams(s):

    n = len(s)
    answer = 0

    # ---------------------------------------------------------
    # Observation:
    #
    # Two substrings are anagrams if and only if their character
    # frequencies are identical.
    #
    # For example:
    #
    #     "mom" -> m:2, o:1
    #     "omm" -> m:2, o:1
    #
    # Since their frequency arrays are identical, they are
    # anagrams.
    #
    # Therefore, we can use a tuple of 26 frequencies as the
    # signature of every substring.
    # ---------------------------------------------------------

    for i in range(n):

        # Frequency array for substrings starting at i.
        freq = [0] * 26

        # -----------------------------------------------------
        # Dictionary:
        #
        # frequency signature -> number of times it has appeared
        #
        # A tuple is used because lists cannot be dictionary keys.
        # -----------------------------------------------------

        seen = {}

        # -----------------------------------------------------
        # Extend the substring one character at a time.
        #
        # Instead of rebuilding the frequency array for every
        # substring, update it using the newly added character.
        # -----------------------------------------------------

        for j in range(i, n):

            freq[ord(s[j]) - ord('a')] += 1

            # Convert the frequency array into an immutable tuple
            # so that it can be used as a dictionary key.

            key = tuple(freq)

            # -------------------------------------------------
            # If this signature has appeared 'count' times before,
            # the current substring forms 'count' new
            # anagrammatic pairs.
            #
            # Example:
            #
            # signature seen 3 times:
            #
            # 1st -> +0
            # 2nd -> +1
            # 3rd -> +2
            #
            # Total = 3 pairs.
            # -------------------------------------------------

            count = seen.get(key, 0)

            answer += count

            seen[key] = count + 1

    return answer`,
    java: `public static int sherlockAndAnagrams(String s) {

    int n = s.length();
    int answer = 0;

    // ---------------------------------------------------------
    // Observation:
    //
    // Two strings are anagrams if they contain exactly the
    // same characters with exactly the same frequencies.
    //
    // For example:
    //
    //     "abbc" -> a:1, b:2, c:1
    //     "bcab" -> a:1, b:2, c:1
    //
    // Therefore, instead of sorting every substring, we can
    // represent each substring using its character-frequency
    // array.
    //
    // Since the string contains lowercase English letters,
    // we only need 26 frequencies.
    // ---------------------------------------------------------

    // ---------------------------------------------------------
    // Fix the starting position of the substring.
    //
    // For every starting position i, we extend the substring
    // one character at a time:
    //
    //     s[i]
    //     s[i...i+1]
    //     s[i...i+2]
    //     ...
    //
    // This allows us to update the frequency array in O(1)
    // instead of rebuilding it for every substring.
    // ---------------------------------------------------------

    for (int i = 0; i < n; i++) {

        int[] freq = new int[26];

        // This map stores:
        //
        // frequency signature -> number of substrings having
        //                         that signature
        //
        // If the same signature appears multiple times, those
        // substrings are anagrammatic with each other.

        HashMap<String, Integer> map = new HashMap<>();

        for (int j = i; j < n; j++) {

            // Add s[j] to the current substring.
            freq[s.charAt(j) - 'a']++;

            // -------------------------------------------------
            // Convert the frequency array into a unique key.
            //
            // Two substrings will get the same key if and only
            // if they contain the same number of every character.
            // -------------------------------------------------

            String key = Arrays.toString(freq);

            // -------------------------------------------------
            // Suppose this signature has already appeared
            // 'count' times.
            //
            // The new substring can form an anagrammatic pair
            // with each of those 'count' previous substrings.
            //
            // Therefore, we add 'count' to the answer.
            //
            // Example:
            //
            // If the same signature has appeared 3 times:
            //
            // First occurrence -> 0 new pairs
            // Second occurrence -> 1 new pair
            // Third occurrence -> 2 new pairs
            //
            // Total = 0 + 1 + 2 = 3
            // which is C(3,2).
            // -------------------------------------------------

            int count = map.getOrDefault(key, 0);

            answer += count;

            map.put(key, count + 1);
        }
    }

    return answer;
}`,
  },
    }
  ],
};