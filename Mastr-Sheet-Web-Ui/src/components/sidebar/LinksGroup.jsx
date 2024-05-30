import { Group, Box,ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import classes from '../theme/linksGroup.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';




// eslint-disable-next-line react/prop-types
export default function LinksGroup({ icon: Icon, label, link , tab }) {
  const location = useLocation();
  const [tabb, setTab] = useState("dash");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search ]);
  
  const navigate = useNavigate();
  return (
    <>
      <UnstyledButton style={{borderRight:tab===tabb?'1px solid red':''}} bg={tab===tabb?'rgb(85 84 84 / 12%)':''} onClick={()=>{navigate(link)}}  className={classes.control}>
        <Group justify="space-between" gap={0} p={5}>
          <Box style={{ display: 'flex' , alignItems: 'center' }}>
            <ThemeIcon variant="dark" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box mr="md">{label}</Box>
           
          </Box>
        </Group>
      </UnstyledButton>
    </>
  );
}

