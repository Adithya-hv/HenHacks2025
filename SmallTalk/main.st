" curl -X GET http://localhost:8085/resources"
" curl -X PUT http://localhost:8085/resources/1 -H 'Content-Type: application/x-www-form-urlencoded' -d 'name=resource1&amount=100&price=10&equiGold=100&changePerDay=1'"
" curl -X DELETE http://localhost:8085/resources/1"
" curl -X POST http://localhost:8085/ask-ai -H 'Content-Type: application/x-www-form-urlencoded' -d 'text=Explain how AI works'"

| resources members teapot |
resources := Dictionary new.
members := Dictionary new.
teapot := Teapot configure: {
#defaultOutput -> #json. #port -> 8085. #debugMode -> true }.

teapot
    POST: '/ask-ai' -> [ :req | | reqBody textDict partsDict result response2 response2 finalResponse |

        "Create the innermost dictionary with the text key"
        textDict := Dictionary new.
        textDict at: 'text' put: (req at: #text).

        "Create a dictionary for the parts, which is an array containing textDict"
        partsDict := Dictionary new.
        partsDict at: 'parts' put: (Array with: textDict).

        "Create the top-level dictionary with contents as an array containing partsDict"
        result := Dictionary new.
        result at: 'contents' put: (Array with: partsDict).

        "Convert the dictionary to a JSON string using NeoJSONWriter"
        reqBody := NeoJSONWriter toString: result.

        response2 := ZnClient new
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$INSERTKEY$'; 
        contents: reqBody; post.

        finalResponse := NeoJSONReader fromString: response2];

    GET: '/resources' -> resources;
    PUT: '/resources/<id>' -> [ :req | | resource |
        resource := {'name' -> (req at: #name).
        'amount' -> (req at: #amount).
        'price' -> (req at: #price).
        'equiGold' -> (req at: #equiGold).
        'changePerDay' -> (req at: #changePerDay)} asDictionary.
        resources at: (req at: #id) put: resource ];

    DELETE: '/resources/<id>' -> [ :req | resources removeKey: (req at: #id)];

    GET: '/members' -> members;
    PUT: '/members/<id>' -> [ :req | | member |
        member := {'name' -> (req at: #name).
        'amount' -> (req at: #amount).
        'price' -> (req at: #price).
        'equiGold' -> (req at: #equiGold).
        'changePerDay' -> (req at: #changePerDay)} asDictionary.
        members at: (req at: #id) put: member ];

    DELETE: '/members/<id>' -> [ :req | members removeKey: (req at: #id)];

exception:
    KeyNotFound -> (TeaResponse notFound body: 'No such resource');
start.

