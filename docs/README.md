# Template Modify


```
POST: id
{
    "template_id": int,
    "elected_officials": [
        "name": {
            "role": str,
            "email": str,
            "zip_codes": {str: true,}
        },
    ],
    "to": array[str],
    "from": str,
    "subject": str,
    "body": str[html] # may be raw HTML
}
```
^ Return
```
{
    "success": bool,
    "message": str
}
```


# Different Issues
```
GET
params: zip: str, start_issue: int, n_issues: int, filter_keyword: str

{
    "elected_officials": {
        "name": {
            "role": str,
            "email": str,
            "zip_codes": {str: true,}
        },
    },
    "newstories": [
        {
            "id": uuid,
            "headline": str,
            "body": str,
            "zip_code": {str: true,},
            "link": str[url],
            "date": str[yyyymmdd],
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
    "message": str,
}
```

```
GET
params: zipcode: int
```