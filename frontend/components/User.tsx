import gql from "graphql-tag";
import { Query } from "react-apollo";

export const CURRENT_USER_QUERY = gql`
	query {
		me {
			id
			email
			name
			permissions
		}
	}
`;

export const User: React.SFC<any> = props => (
	<Query {...props} query={CURRENT_USER_QUERY}>
		{payload => props.children(payload)}
	</Query>
);
