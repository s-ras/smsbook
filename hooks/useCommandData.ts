import { eq, asc, sql, gt, lt, and } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { db } from "@/database/client";

import { command_data, InsertCommandData } from "@/schema/command_data";
import { parameters } from "@/schema/parameters";

const useGetCommandData = (id: string) => {
	return useLiveQuery(
		db
			.select()
			.from(command_data)
			.where(eq(command_data.command_id, id))
			.orderBy(asc(command_data.order))
	).data;
};

const useGetCommandString = (id: string) => {
	const data = db
		.select()
		.from(command_data)
		.where(eq(command_data.command_id, id))
		.leftJoin(parameters, eq(command_data.param_id, parameters.id))
		.all();

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

const useInsertCommandData = (id: string) => {
	const ecd = useGetCommandData(id);
	const order = ecd[ecd.length - 1].order + 1 || 1;
	return ({ param_id, data }: { param_id?: string; data?: string }) => {
		db.insert(command_data).values({
			command_id: id,
			param_id,
			data,
			order,
		});
	};
};

const useUpdateCommandData = () => {
	return ({
		id,
		data,
		param_id,
	}: {
		id: string;
		data?: string;
		param_id?: string;
	}) => {
		const updates: Partial<InsertCommandData> = {};
		if (data) updates.data = data;
		if (param_id) updates.param_id = param_id;

		db.update(command_data)
			.set({ ...updates })
			.where(eq(command_data.id, id));
	};
};

const useReorderCommandData = () => {
	return (id: string, order: number) => {
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

const useDeleteCommandData = (cmd_id: string) => {
	const ecd = useGetCommandData(cmd_id);
	const reorder = useReorderCommandData();
	return (id: string) => {
		reorder(id, ecd.length);
		db.delete(command_data).where(eq(command_data.id, id));
	};
};

const useCommandData = {
	get: useGetCommandData,
	getString: useGetCommandString,
	insert: useInsertCommandData,
	update: useUpdateCommandData,
	reorder: useReorderCommandData,
	delete: useDeleteCommandData,
};

export default useCommandData;
