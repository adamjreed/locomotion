import os
from io import BytesIO
from zipfile import ZipFile
from urllib.request import urlopen
from datetime import datetime
import boto3
import argparse

s3 = boto3.resource('s3')
parser = argparse.ArgumentParser()
parser.add_argument('--city')
parser.add_argument('--feed_url')
args = parser.parse_args()
bucketName = os.environ["BUCKET_NAME"]
bucketPrefix = args.city + "/"
date = datetime.now()

resp = urlopen(args.feed_url)
lastModified = resp.info()["Last-Modified"]

print("last modified: " + lastModified)

lastDownloadedObj = s3.Object(
    bucketName, bucketPrefix + "last_modified.txt")

try:
    # check for a file containing the last time we imported a feed
    lastDownloaded = lastDownloadedObj.get()['Body'].read().decode()
    print("last downloaded: " + lastDownloaded)
    fileUpdated = (lastModified != lastDownloaded)
except s3.meta.client.exceptions.NoSuchKey:
    # if we don't have a stored lastModified date, we assume
    # we're grabbing this feed for the first time
    fileUpdated = True

if fileUpdated:
    zipfile = ZipFile(BytesIO(resp.read()))
    for file in zipfile.namelist():
        if file[-4:] == ".txt":
            print("saving " + file)
            contents = zipfile.read(file)
            s3.Object(
                bucketName,
                "%sgtfs/%s/year=%s/month=%s/day=%s/%s" %
                (
                    bucketPrefix,
                    file[:-4],
                    date.strftime("%Y"),
                    date.strftime("%m"),
                    date.strftime("%d"),
                    file
                )
            ).put(Body=contents)

    lastDownloadedObj.put(Body=lastModified)
else:
    print("no new files")
