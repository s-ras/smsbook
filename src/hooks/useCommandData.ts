import { eq, asc, sql, gt, lt, and } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@database/client";

import { command_data, InsertCommandData } from "@schema/command_data";
import { parameters } from "@schema/parameters";

const useGetCommandData = (id: number) => {
	const c = useLiveQuery(
		db
			.select()
			.from(command_data)
			.leftJoin(parameters, eq(command_data.param_id, parameters.id))
			.where(eq(command_data.command_id, id))
			.orderBy(asc(command_data.order))
	).data;

	return c;
};

const useGetCommandString = (id: number) => {
	const data = useLiveQuery(
		db
			.select()
			.from(command_data)
			.leftJoin(parameters, eq(command_data.param_id, parameters.id))
			.where(eq(command_data.command_id, id))
	).data;

	let res = "";

	data.forEach(d => {
		if (d.parameters) {
			res += d.parameters.value;
		} else {
			res += d.command_data.data;
		}
	});

	return res;
};

const useSelectCommandData = (id: number) => {
	const cd = useLiveQuery(
		db
			.select()
			.from(command_data)
			.leftJoin(parameters, eq(command_data.param_id, parameters.id))
			.where(eq(command_data.id, id))
	).data[0];

	return cd;
};

const useInsertCommandData = (id: number) => {
	const ecd = useGetCommandData(id);
	return ({ param_id, data }: { param_id?: number; data?: string }) => {
		const order =
			(ecd &&
				ecd[ecd.length - 1] &&
				ecd[ecd.length - 1].command_data.order + 1) ||
			1;
		db.insert(command_data)
			.values({
				command_id: id,
				param_id: param_id ? param_id : undefined,
				data: data ? data : undefined,
				order,
			})
			.run();
	};
};

const useUpdateCommandData = (id: number) => {
	return ({ data, param_id }: { data?: string; param_id?: number }) => {
		const updates: Partial<InsertCommandData> = {};
		if (data) updates.data = data;
		if (param_id) updates.param_id = param_id;

		db.update(command_data)
			.set({ ...updates })
			.where(eq(command_data.id, id))
			.run();
	};
};

const useReorderByOrder = () => {
	return (from: number, to: number) => {
		db.transaction(async tx => {
			const current = tx
				.select()
				.from(command_data)
				.where(eq(command_data.order, from))
				.get();

			if (!current) {
				throw new Error();
			}

			if (current.order < to) {
				tx.update(command_data)
					.set({ order: sql`${command_data.order} - 1` })
					.where(
						and(
							gt(command_data.order, current.order),
							lt(command_data.order, to + 1)
						)
					)
					.run();
			} else if (current.order > to) {
				tx.update(command_data)
					.set({ order: sql`${command_data.order} + 1` })
					.where(
						and(
							lt(command_data.order, current.order),
							gt(command_data.order, to - 1)
						)
					)
					.run();
			}

			tx.update(command_data)
				.set({ order: to })
				.where(eq(command_data.id, current.id))
				.run();
		});
	};
};

const useReorderCommandData = () => {
	return (id: number, order: number) => {
		db.transaction(async tx => {
			const current = tx
				.select()
				.from(command_data)
				.where(eq(command_data.id, id))
				.get();

			if (!current) {
				throw new Error();
			}

			if (current.order < order) {
				tx.update(command_data)
					.set({ order: sql`${command_data.order} - 1` })
					.where(
						and(
							gt(command_data.order, current.order),
							lt(command_data.order, order + 1)
						)
					)
					.run();
			} else if (current.order > order) {
				tx.update(command_data)
					.set({ order: sql`${command_data.order} + 1` })
					.where(
						and(
							lt(command_data.order, current.order),
							gt(command_data.order, order - 1)
						)
					)
					.run();
			}

			tx.update(command_data)
				.set({ order })
				.where(eq(command_data.id, id))
				.run();
		});
	};
};

const useDeleteCommandData = (cmd_id: number) => {
	const ecd = useGetCommandData(cmd_id);
	const reorder = useReorderCommandData();
	return (id: number) => {
		reorder(id, ecd.length + 1);
		db.delete(command_data).where(eq(command_data.id, id)).run();
	};
};

const useCommandData = {
	get: useGetCommandData,
	getString: useGetCommandString,
	select: useSelectCommandData,
	insert: useInsertCommandData,
	update: useUpdateCommandData,
	reorder: useReorderCommandData,
	reorderByOrder: useReorderByOrder,
	delete: useDeleteCommandData,
};

export default useCommandData;
