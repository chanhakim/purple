# Template Modify


```
POST
{
    "elected_officials": [
        "name": {
            "role": str,
            "email": str,
            "zip_codes": array[str]
        },
    ],
    "to": array[str],
    "from": str,
    "subject": str,
    "body": str[html]
}
```
^ Return
```
{
    "success": bool,
    "error_msg": str
}
```


# Different Issues
```
GET
params: start_issue: int, n_issues: int, filter_keyword: str

{
    "elected_officials": [
        "name": {
            "role": str,
            "email": str,
            "zip_codes": array[str]
        },
    ],
    "newstories": [
        {
            "headline": str,
            "body": str,
            "zip_code": array[str],
            "link": str[url]
        }
    ]
}
```

# Zip Code
```
POST
{
    "zip": str
}
```
^ Return
```
{
    "success": bool,
    "error_msg": str,
}
```