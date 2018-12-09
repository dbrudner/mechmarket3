import { Carousel } from "antd";

type Props = {
	images: string[];
	name: string;
};

export const Cover: React.SFC<Props> = ({ images, name }) => (
	<div style={{ padding: "50px" }}>
		<Carousel>
			{images.map(image => (
				<img
					key={`keyboard-carousel-img-url-${image}`}
					src={image}
					alt={name}
					onError={(e: any) => {
						e.target.src =
							"https://target.scene7.com/is/image/Target/GUEST_f91292e8-2cda-4031-85b1-dec4db1621a1?wid=488&hei=488&fmt=webp";
					}}
				/>
			))}
		</Carousel>
	</div>
);
