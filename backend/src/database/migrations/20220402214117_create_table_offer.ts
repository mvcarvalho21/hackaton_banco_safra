import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('offer', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

        table.integer('amount_split')
        table.integer('amount_of_rest_splits')
        table.decimal('actual_value_split');
        table.decimal('financed_value_without_fee');
        table.string('type');
        table.string('old_tax');
        table.string('new_tax');
        table.decimal('actual_score');
        table.boolean('accepted').defaultTo(false);

        table.uuid('id_user').references('user.id').notNullable();

        table.timestamp('expire_at');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTable('offer');
}
