import { AuthChecker } from 'type-graphql';

import Context from '../types/context';

const authChecker: AuthChecker<Context> = ({ context }) => !!context.user;

export default authChecker;
