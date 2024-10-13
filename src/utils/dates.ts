export const isLessThanAWeekAgo = (inputDate: Date) => {
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
	return (
		inputDate > oneWeekAgo &&
		inputDate.getFullYear() === oneWeekAgo.getFullYear()
	);
};

export const isToday = (inputDate: Date) => {
	const now = new Date();
	return (
		inputDate.getDate() === now.getDate() &&
		inputDate.getFullYear() === now.getFullYear()
	);
};

export const humanReadableDate = (d: Date) => {
	if (isToday(d)) {
		return Intl.DateTimeFormat("fa-IR-u-ca-persian", {
			hour: "numeric",
			minute: "numeric",
		}).format(d);
	} else if (isLessThanAWeekAgo(d)) {
		return Intl.DateTimeFormat("fa-IR-u-ca-persian", {
			weekday: "long",
		}).format(d);
	} else {
		return Intl.DateTimeFormat("fa-IR-u-ca-persian").format(d);
	}
};
