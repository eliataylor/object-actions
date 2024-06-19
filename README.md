# Object-Actions Worksheet

--------------------------------------------------------------------------------

## PURPOSE
- [x] Relational Database Schema Design
- [x] Scaffolding Content Management Systems
- [x] Scaffolding Authentication and Access Permissions
- [x] Scaffolding Web App interface and API connectivity
- [x] Scaffolding Cypress.io test suites
- [x] Generating unlimited numbers of fake data entries to test

## USAGE:
### Generate your Django Admin CMS and API:
- `git clone git@github.com:eliataylor/object-actions.git`
- `cd object-actions`
- `python3.9 -m venv .venv` (pretty much any version of python should work)
- `source .venv/bin/activate`
- `pip install -r requirements.txt`
- `python django/generate.py admin --types=examples/object-fields-nod.csv --output_dir=examples/generated`
If you use Address or Price field types, you'll need to add the 'address' and 'django-money' entries to the INSTALLED_APPS list in your settings.py file:
```python
INSTALLED_APPS = [
    # ... 
    'address',
    'django-money',
    # ... 
]
```


### Run Generated CMS and API
- Follow [django/README.md](django/README.md) to setup a new project or make a few changes to your settings.py 
- `cd examples/generated` (the root of your project with the output above)
- `python3.9 -m venv .venv` (pretty much any version of python should work)
- `source .venv/bin/activate`
- `pip install -r requirements.txt`
- `python manage.py createsuperuser` (create your admin login)
- `python manage.py makemigrations`
- `python manage.py migrate --run-syncdb`
- `python manage.py runserver`

## Getting Started

Copy and start your own from this [empty version](https://docs.google.com/spreadsheets/d/14Ej7lu4g3i85BWJdHbi4JK2jM2xS5uDSgfzm3rIhx4o/edit?usp=sharing).

This [example version](https://docs.google.com/spreadsheets/d/1Jm15OeR6mS6vbJd7atHErOwBgq2SwKAagb4MH0D1aIw/edit?usp=sharing) describes an open source platform for rallying citizens to civic engagement called Democrasee (github.com/DemocraseeClub). Screenshots are below:

![Object/Actions](docs/object-actions-democrasee.png)
![Object Fields](docs/objects-democrasee.png)
![Vocabulary Fields](docs/vocabularies-democrasee.png)
![Permissions Matrix](docs/permissions-matrix-democrasee.png)

All Select options under Fields Types (Column D) in the Object Fields sheet come from column A in the "selectors" sheet. If you have special field types, add them here. The checkboxes roughly describe what Fields are support by the different CMS config builders in this repository.
![Field Types](docs/field-types.png)


## DEVELOPMENT ROADMAP
- [x] Generate Django Admin CMS
- [x] Generate Django Restful API with Swagger Docs
- [ ] Generate Fake Data builder via HTTP (https://mockaroo.com/?)
- [ ] Generate ReactJS app
  - [ ] TypeScript interface and object types defined 
  - [ ] Material-UI Drawer of Permissions Matrix Paths
- [ ] Generate Cypress.io test suite
- [ ] AppScrips to generate full Worksheet for given Object-Actions list

To contribute read: [CONTRIBUTING.md](CONTRIBUTING.md)