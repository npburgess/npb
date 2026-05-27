export interface ListItemProps {
	linkText: string;
	linkHref?: string;
	onClick?: React.MouseEventHandler;
	svgClassName: string;
	pathD: string;
}

export default function ListItem({ linkText, linkHref, onClick, svgClassName, pathD }: ListItemProps) {
	return (
		<li className="pr-2.5">
			<a
				aria-label={linkText}
				className="block w-7 h-7"
				target={linkHref ? '_blank' : undefined}
				href={linkHref ? linkHref : undefined}
				onClick={onClick ? onClick : undefined}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={svgClassName + ' hover:fill-blue-300'}
					viewBox="0 0 448 512"
				>
					<path d={pathD} />
				</svg>
			</a>
		</li>
	);
}
