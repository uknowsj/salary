const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = (url: URL | string) => {
	if (process.env.NODE_ENV !== 'development') {
		window.gtag('config', GA_TRACKING_ID as string, {
			page_path: url,
		});
	}
};

type GtagEvent = {
	action?: string;
	label?: string;
	value: string;
};
export const event = ({ action = 'click_button', label = 'button_name', value }: GtagEvent) => {
	if (process.env.NODE_ENV !== 'development') {
		window.gtag('event', action, {
			event_label: label,
			value: value,
		});
	}
};
