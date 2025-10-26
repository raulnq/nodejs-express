export const up = knex => {
  return knex.schema.createTable('todos', table => {
    table.uuid('id').primary();
    table.string('title', 255).notNullable();
    table.boolean('completed').notNullable().defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

export const down = knex => {
  return knex.schema.dropTableIfExists('todos');
};
