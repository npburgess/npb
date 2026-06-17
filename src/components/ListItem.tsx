export interface ListItemProps {
	linkText: string;
	linkHref?: string;
	onClick?: React.MouseEventHandler;
	svgClassName: string;
	pathD: string;
	viewBox?: string;
}

export default function ListItem({ linkText, linkHref, onClick, svgClassName, pathD, viewBox }: ListItemProps) {
	return (
		<li>
			<a
				aria-label={linkText}
				role={linkHref ? "link" : "button"}
				aria-haspopup={onClick ? "dialog" : undefined}
				title={linkText}
				className="block w-7 h-7 cursor-pointer"
				target={linkHref ? "_blank" : undefined}
				href={linkHref ? linkHref : "#"}
				onClick={onClick ? onClick : undefined}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={svgClassName + " hover:fill-blue-300 w-7"}
					viewBox={viewBox ? viewBox : "0 0 448 512"}
				>
					<path d={pathD} />
				</svg>
			</a>
		</li>
	);
}
