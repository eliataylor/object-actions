# NOD Backend

## Installation

1. **Clone the repository:**

    ```sh
    git clone  git@github.com:eliataylor/oaexample.git
    cd oaexample
    python3.12 -m venv .venv
    source .venv/bin/activate  # On Windows use `env\Scripts\activate`
    pip install -r requirements.txt
    ```

4. **Apply migrations:**
    ```sh
    python manage.py migrate
    python manage.py migrate --run-syncdb
    python manage.py makemigrations
    ```

5. **Create a superuser:**

    ```sh
    python manage.py createsuperuser
    ```

6. **Run the development server:**

    ```sh
    python manage.py runserver 8000
    python manage.py runserver_plus localhost-api.oaexample.com:8080 --cert-file ~/.ssh/oaexample.crt
    ```


------

# To Connect to remote SQL:
- `./cloud-sql-proxy instant-jetty-426808-u5:us-west1:mysql-v8 --credentials-file ./keys/oaexample-django.json`

https://loremflickr.com/cache/resized/2899_14217668178_6e80f204fa_b_640_480_nofilter.jpg
https://loremflickr.com/cache/resized/5485_9128959279_54a521df49_c_640_480_nofilter.jpg
TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'TLSSocket'
    |     property 'parser' -> object with constructor 'HTTPParser'
    --- property 'socket' closes the circle
    at JSON.stringify (<anonymous>)
    at IncomingMessage.<anonymous> (<anonymous>:1:27)
    at WorldBuilder.<anonymous> (/home/elitaylor/Developer/tmt/object-actions/databuilder/src/WorldBuilder.ts:153:45)
    at Generator.next (<anonymous>)
    at fulfilled (/home/elitaylor/Developer/tmt/object-actions/databuilder/src/WorldBuilder.ts:29:58)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)