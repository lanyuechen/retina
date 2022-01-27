import { useState } from 'react';
import Toolbar from '@/components/Toolbar';
import Layout from '@/pages/Room/Layout';

export default () => {
  const [peers, setPeers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);


  return (
    <div>
      <Layout
        drawer={"xxxxx"}
        open={open}
        onClose={() => setOpen(false)}
        toolbar={(
          <Toolbar
            peers={peers}
            devices={[]}
            onAction={(key: string) => {if(key==='show-peers'){setOpen(true)}}}
          />
        )}
      >
        xxxx
      </Layout>
      {/* <Toolbar
        peers={peers}
        devices={[]}
        onAction={(key: string) => {console.log(key)}}
      /> */}
    </div>
  );
}