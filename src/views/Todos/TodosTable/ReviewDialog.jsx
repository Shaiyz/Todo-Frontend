import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  useTheme,
  ButtonGroup,
  IconButton,
} from '@material-ui/core'
import Table from '../../../components/Table/Table'
import StarRating from 'react-rating-stars-component'
import { Cancel, CheckCircle, ThumbDown, ThumbUp } from '@material-ui/icons'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reviewActions } from '../../../redux-store'

import backend from '../../../api'
import { toast } from 'react-toastify'

const ReviewDialog = ({ open, onClose, reviews }) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const activateReview = async (review) => {
    let token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await backend.put(
      `/admin/review/activate?review_id=${review._id}&isActive=${true}`,
      review,
      config
    )
    dispatch(reviewActions.fetchReviews(review.album._id))
    onClose()
    toast.success(data.message)
  }
  const deactivateReview = async (review) => {
    let token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await backend.put(
      `/admin/review/activate?review_id=${review._id}&isActive=${false}`,
      review,
      config
    )
    onClose()
    dispatch(reviewActions.fetchReviews(review.album._id))
    toast.success(data.message)
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md'>
      <DialogTitle>Reviews</DialogTitle>
      <DialogContent>
        <Table
          columns={[
            { title: 'By', field: 'reviewer' },
            { title: 'Album', field: 'album' },
            { title: 'Rating', field: 'rating', filtering: false },
            { title: 'Comment', field: 'comment' },
            { title: 'Status', field: 'status' },
            { title: 'Approval', field: 'approval' },
            { title: 'Action', field: 'actions', filtering: false },
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
          }}
          data={reviews.map((r) => {
            return {
              reviewer: r.customer.user.name,
              album: r.album.album_name,
              rating: (
                <>
                  <StarRating
                    edit={false}
                    value={r.rating / 2}
                    count={5}
                    size={24}
                    half
                    isHalf
                    activeColor='#4169e1'
                  />
                  <small>{r.rating} / 10</small>
                </>
              ),
              comment: r.comment,
              status: r.isActive ? 'Active' : 'Disabled',
              approval: r.isApproved,
              actions: (
                <ButtonGroup>
                  {r.isActive ? (
                    <IconButton
                      title='Disable Review'
                      onClick={(e) => deactivateReview(r)}
                    >
                      <Cancel color='error' />
                    </IconButton>
                  ) : (
                    <IconButton
                      title='Enable Review'
                      onClick={(e) => {
                        activateReview(r)
                      }}
                    >
                      <CheckCircle color='secondary' />
                    </IconButton>
                  )}
                </ButtonGroup>
              ),
            }
          })}
        ></Table>
        <DialogActions>
          <Button variant='contained' onClick={onClose} color='primary'>
            ok
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ReviewDialog)
