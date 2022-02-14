# SuperCoop Berlin odoo addons

## How to develop & test

Set up the https://github.com/SuperCoopBerlin/odoo-docker Docker environment, which runs from a (defused clone of the production database). Then, in the `docker-compose.yml`, mount the addons under development:

```yml
volumes:
  - '/home/leon/Development/supercoop/odoo-addons:/srv/odoo/parts/SuperCoopBerlin/odoo-addons:ro'
```

Whenever you've changed the code:

```bash
# Only required when changing views, records, etc. which get installed to and run from the database
# Adjust to the addon you're developing of course.
docker-compose exec odoo dob run -i pos_product_deposit --stop-after-init
# Reload code & items from database
docker-compose restart odoo
```
