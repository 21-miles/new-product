import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const VerticalMenu = () => {
  return (
    <List>
      {/* ...existing menu items... */}
      <ListItem component='a' href='/posts'>
        <ListItemIcon>PAPER</ListItemIcon>
        <ListItemText primary='Posts' />
      </ListItem>
      <ListItem component='a' href='/pages'>
        <ListItemIcon>POST</ListItemIcon>
        <ListItemText primary='Pages' />
      </ListItem>
      {/* ...existing menu items... */}
    </List>
  )
}

export default VerticalMenu
