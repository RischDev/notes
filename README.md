<!-- @format -->

# TeamBN Notes Tool

This notes tool is designed to allow runners to create routes in a JSON format that can be parsed and displayed in a neat format, and integrate their route with the tracking tool.

Below are instructions on how to submit your route for review.

## Step 1: Create new branch

Create a branch by going to [the repo home page](https://github.com/RischDev/notes). You will then see `master` near the top left. Click that, and type in the new for your new branch.

## Step 2: Add your route to the new branch

Upload your file into the `public/notes` directory.

## Step 3: Update routes.json (Optional)

_You may skip this step if you are only updating an existing route._

Update the `src/notes/routes.json` file to include your route.

For example, let's say you want to add an MMBN1 route. The `routes.json` file might look like:

```
    "MMBN1": [
        {
            "title": "Example Route Title",
            "path": "example_path"
        }
    ]
```

To add your route, add a comma after the last item in the game list, then add your route using this template.

```
        {
            "title": "YOUR ROUTE TITLE HERE",
            "path": "YOUR_PATH_HERE"
        }
```

In the MMBN1 example, `routes.json` should look like this after you've updated it:

```
    "MMBN1": [
        {
            "title": "Example Route Title",
            "path": "example_path"
        },
        {
            "title": "YOUR ROUTE TITLE HERE",
            "path": "YOUR_PATH_HERE"
        }
    ]
```

## Step 3: Submit a Pull Request

Finally, submit a pull request. You may do this by clicking "Pull Requests" in the github repo navigation, then clicking "Create pull request" button and selecting your branch under the "compare" dropdown.

## Step 4: Wait patiently

Risch (or others once I eventually add additional admins) will review your request, verify the route doesn't break anything, and then accept the pull request. We will then deploy the changes to the live version so that everyone can see and use your route. If you have waited a few days and your pull request hasn't been seen yet, feel free to ping Risch on Discord. :)
