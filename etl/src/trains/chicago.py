from urllib.request import urlopen
import json


def get(apiKey):
    url = (
        "http://lapi.transitchicago.com/api/1.0/ttpositions.aspx"
        "?key=%s&rt=red,blue,brn,g,org,p,pink,y&outputType=JSON"
    )

    try:
        resp = urlopen(url % apiKey)
        body = resp.read()
        results = json.loads(body)
        body = {
            "updated": results["ctatt"]["tmst"],
            "trains": []
        }

        for line in results["ctatt"]["route"]:
            name = line["@name"]

            # If there are no trains active, there won't be a "train" field
            if line["train"] is None:
                continue
            # If there is only one train active, the API returns an object
            elif type(line["train"]) is dict:
                body["trains"].append(parse_train(name, line["train"]))
            # If there are multiple trains active, the API returns an array
            else:
                for train in line["train"]:
                    body["trains"].append(parse_train(name, train))
        return body
    except Exception as e:
        print(e)
        raise


def parse_train(line, train):
    return {
        "id": train["rn"],
        "line": line,
        "lat": train["lat"],
        "lng": train["lon"],
        "heading": train["heading"]
    }
