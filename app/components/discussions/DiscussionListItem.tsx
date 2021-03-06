import Paper from '@material-ui/core/Paper';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import React from 'react';

import { Discussion, Store, Team } from '../../lib/store';
import DiscussionActionMenu from './DiscussionActionMenu';

type Props = {
  store?: Store;
  discussion: Discussion;
  team: Team;
};

class DiscussionListItem extends React.Component<Props> {
  public render() {
    const { store, discussion, team } = this.props;
    const trimmingLength = 16;

    const selectedDiscussion = store.currentUrl === `/team/${team.slug}/d/${discussion.slug}`;

    return (
      <Paper
        key={discussion._id}
        style={{
          margin: '10px 10px 5px 0px',
          padding: '8px',
          border: selectedDiscussion ? '1px rgba(255,255,255,0.5) solid' : 'none',
        }}
        elevation={selectedDiscussion ? 24 : 1}
      >
        <li key={discussion._id} style={{ whiteSpace: 'nowrap', paddingRight: '10px' }}>
          <Link
            prefetch
            scroll={false}
            href={`/discussion?teamSlug=${team.slug}&discussionSlug=${discussion.slug}`}
            as={`/team/${team.slug}/d/${discussion.slug}`}
          >
            <a style={{ fontWeight: 300 }}>
              {discussion.name.length > trimmingLength
                ? `${discussion.name.substring(0, trimmingLength)}...`
                : discussion.name}
            </a>
          </Link>
          <div
            style={{
              float: 'right',
              marginRight: '-12px',
            }}
          >
            <DiscussionActionMenu discussion={discussion} />
          </div>
        </li>
      </Paper>
    );
  }
}

export default inject('store')(observer(DiscussionListItem));
