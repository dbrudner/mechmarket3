import { User } from "./User";
import { Signout } from "./";

export default () => (
	<div>
		<User>
			{({ data }) => {
				console.log(data);
				if (!data.me) return null;
				return <p>hey {data.me.name}</p>;
			}}
		</User>
		<Signout />
	</div>
);
