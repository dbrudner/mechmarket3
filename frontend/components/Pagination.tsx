import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
import Link from "next/link";

const PAGINATION_QUERY = gql`
	query keyboardData {
		keyboardsConnection {
			aggregate {
				count
			}
		}
	}
`;

export default ({ page }) => (
	<div>
		<Query query={PAGINATION_QUERY}>
			{({ data, loading, error }) => {
				if (loading) {
					return loading;
				}
				const count = data.keyboardsConnection.aggregate.count;
				const pages = Math.ceil(count / perPage);

				return (
					<div>
						<Link
							prefetch
							href={{
								pathname: "/",
								query: { page: page - 1 }
							}}
						>
							<a>Prev</a>
						</Link>
						Page {page} of {pages}
						<Link
							prefetch
							href={{
								pathname: "/",
								query: { page: page + 1 }
							}}
						>
							<a>Next</a>
						</Link>
					</div>
				);
			}}
		</Query>
	</div>
);
