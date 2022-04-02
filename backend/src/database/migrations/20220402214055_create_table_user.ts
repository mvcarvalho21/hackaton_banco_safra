import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('user', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

        table.string('cpf').unique().notNullable();
        table.string('password')
        table.string('name');
        table.string('last_name');
        table.string('phone');
        table.string('email').unique();
    
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTable('user');
}
