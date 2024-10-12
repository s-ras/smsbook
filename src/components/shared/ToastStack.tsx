import useToastStore from "@state/toastStore";

import Toast from "@components/shared/Toast";

const ToastStack: React.FC = () => {
	const toasts = useToastStore(state => state.toasts);

	return (
		<>
			{toasts.map(t => (
				<Toast
					key={t.id}
					id={t.id}
					text={t.text}
					icon={t.icon}
				/>
			))}
		</>
	);
};

export default ToastStack;
