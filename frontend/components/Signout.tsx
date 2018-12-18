import { Button } from "antd/lib/radio";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";

export const Signout = props => {
	const SIGN_OUT_MUTATION = gql`
		mutation {
			signout {
				message
			}
		}
	`;

	return (
		<Mutation
			mutation={SIGN_OUT_MUTATION}
			refetchQueries={CURRENT_USER_QUERY}
		>
			{signout => <a onClick={() => signout()}>Sign out</a>}
		</Mutation>
	);
};
