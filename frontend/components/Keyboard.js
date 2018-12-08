import { Card, Tag, Button } from "antd";
import Link from "next/link";
import DeleteKeyboard from "./DeleteKeyboard";

const { Meta } = Card;

const Cover = ({ name, url, id }) => (
	<Link href={`/keyboard?id=${id}`}>
		<a>
			<img
				style={{
					width: "250px",
					padding: "20px",
					margin: "auto",
					display: "block"
				}}
				src="https://target.scene7.com/is/image/Target/GUEST_f91292e8-2cda-4031-85b1-dec4db1621a1?wid=488&hei=488&fmt=webp"
				alt={name}
				onError={e => {
					e.target.src =
						"https://target.scene7.com/is/image/Target/GUEST_f91292e8-2cda-4031-85b1-dec4db1621a1?wid=488&hei=488&fmt=webp";
				}}
			/>
		</a>
	</Link>
);

export default ({
	keyboard: {
		s,
		name,
		switches,
		size,
		layout,
		price,
		description,
		keycaps,
		id,
		condition,
		images
	}
}) => {
	return (
		<Card
			style={{ maxWidth: 600, marginTop: "15px" }}
			cover={<Cover name={name} url={images[0]} id={id} />}
		>
			<h3 style={{ fontSize: "32px" }}>
				<Link href={`/keyboard?id=${id}`}>
					<a style={{ color: "rgba(0,0,0,.65)" }}>{name}</a>
				</Link>
			</h3>
			<div>${price.toFixed(2)}</div>
			<div style={{ margin: "15px 0" }}>
				<Tag color="magenta">{layout}</Tag>
				<Tag color="geekblue">{size}</Tag>
				<Tag color="cyan">{condition || "Used"}</Tag>
			</div>
			<p>{description}</p>
			<p>Switches: {switches}</p>
			<p>Size: {size}</p>
			<p>Layout: {layout}</p>
			<p>Keycaps: {keycaps}</p>
			<DeleteKeyboard id={id} />
		</Card>
	);
};
