### trump-approval-rating

A lambda function.

Parses a [CSV](https://projects.fivethirtyeight.com/trump-approval-data/approval_topline.csv) provided by FiveThirtyEight to find the most recent approval rating (%).

If successful, responds with a 200 with the following as the body:

```
{
  rating: "42.12308",
  timestamp: "2018-05-12T00:07:30.000Z"
}
```

If an error is thrown, it responds with a 500.
