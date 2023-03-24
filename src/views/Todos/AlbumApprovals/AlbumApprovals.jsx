import {
  Box,
  ButtonGroup,
  IconButton,
  Typography,
  useTheme,
  Button,
  Grid,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import Popup from '../../../components/Popup/Popup'
import Table from '../../../components/Table/Table'
import { albumActions } from '../../../redux-store'
import ClipLoader from 'react-spinners/ClipLoader'

const AlbumsApprovals = ({ artistId, albums }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  const [id, setId] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const { loading } = useSelector((state) => state.albums)
  const { loadin } = useSelector((state) => state.albumsByArtist)

  return loading ? (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 70,
      }}
    >
      <ClipLoader color={'#000000'} loading={loading} size={40} />
    </div>
  ) : loadin ? (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 70,
      }}
    >
      <ClipLoader color={'#000000'} loading={loadin} size={40} />
    </div>
  ) : (
    <div>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4'>
          Album Approvals
          {artistId
            ? albums.length > 0
              ? ` of Artist ${
                  albums[0].artist ? albums[0].artist.user.name : ''
                }`
              : ''
            : ''}
        </Typography>
      </Box>
      <br />
      <Table
        columns={[
          { title: 'Album', field: 'album' },
          { title: 'Artist', field: 'artist' },
          { title: 'Genre', field: 'genre' },
          { title: 'Featured', field: 'featured' },
          { title: 'Digital Price ($)', field: 'digitalPrice' },
          { title: 'CD Price ($)', field: 'cdPrice' },
          { title: 'Vinyl Record Price ($)', field: 'vinylRecordPrice' },
          { title: 'Approval', field: 'approval' },
          { title: 'Actions', field: 'actions', filtering: false },
        ]}
        options={{
          toolbar: false,
          headerStyle: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.white,
            fontWeight: 500,
            fontSize: 14,
          },
          rowStyle: {
            alignItems: 'center',
          },
          search: false,
          filtering: true,
          title: false,
          groupng: true,
        }}
        data={albums.map((album) => ({
          album: album.album_name,
          artist:
            album.artist && album.artist.user ? album.artist.user.name : '',
          genre: album.genre,
          featured: album.isFeatured ? 'Yes' : 'No',
          digitalPrice: album.digital_price && album.digital_price.toFixed(2),
          cdPrice: album.cd_price && album.cd_price.toFixed(2),
          vinylRecordPrice:
            album.vinyl_record_price && album.vinyl_record_price.toFixed(2),
          approval:
            album.isApproved.length > 0 &&
            album.isApproved?.slice(-1)[0]?.status === 'decline'
              ? 'Declined'
              : album.isApproved?.slice(-1)[0]?.status === 'pending'
              ? 'Pending'
              : album.isApproved?.slice(-1)[0]?.status === 'approved'
              ? 'Approved'
              : 'Formal request not created yet',
          actions:
            album.isApproved.length > 0 ? (
              album.isApproved.slice(-1)[0].status === 'decline' ? (
                <>
                  <ButtonGroup>
                    <IconButton title='Accept Album'>
                      <ThumbUp color='disabled' />
                    </IconButton>
                    <IconButton title='Reject Album'>
                      <ThumbDown color='disabled' />
                    </IconButton>
                  </ButtonGroup>
                </>
              ) : album.isApproved.slice(-1)[0].status === 'pending' ? (
                <>
                  <ButtonGroup>
                    <IconButton
                      title='Accept Album'
                      onClick={() => {
                        setId(album._id)
                        setOpenPopup(true)
                        setStatus('accepted')
                        // acceptRequest(album)
                      }}
                    >
                      <ThumbUp color='secondary' />
                    </IconButton>
                    <IconButton
                      title='Reject Album'
                      onClick={() => {
                        setId(album._id)
                        setStatus('declined')
                        setOpenPopup(true)
                      }}
                    >
                      <ThumbDown color='error' />
                    </IconButton>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <ButtonGroup>
                    <IconButton
                      title='Reject Album'
                      onClick={() => {
                        setId(album._id)
                        setStatus('declined')
                        setOpenPopup(true)
                      }}
                    >
                      <ThumbDown color='error' />
                    </IconButton>
                  </ButtonGroup>
                </>
              )
            ) : (
              <ButtonGroup>
                <IconButton title='Accept Album'>
                  <ThumbUp color='disabled' />
                </IconButton>
                <IconButton title='Reject Album'>
                  <ThumbDown color='disabled' />
                </IconButton>
              </ButtonGroup>
            ),
        }))}
      ></Table>
      <Popup
        title='Change Album Status'
        description='Are you sure?'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Grid container>
          <Grid item xs={6} lg={12}>
            <div>
              <Button
                variant='contained'
                color='secondary'
                style={{ width: '200px' }}
                onClick={() => {
                  if (status === 'accepted') {
                    dispatch(albumActions.acceptAlbum(id))
                  } else if (status === 'declined') {
                    dispatch(albumActions.declineAlbum(id))
                  }

                  setOpenPopup(false)
                }}
              >
                Yes
              </Button>{' '}
              <Button
                color={'secondary'}
                variant='contained'
                style={{ width: '200px' }}
                onClick={() => {
                  setOpenPopup(false)
                }}
              >
                No
              </Button>
            </div>
          </Grid>
        </Grid>
      </Popup>
    </div>
  )
}

export default AlbumsApprovals
