import Image from 'next/image'
import { useRouter } from 'next/router'

import { Button } from '../common/components/Button/Button'
import { getLayout } from '../common/components/Layout/BaseLayout/BaseLayout'
import Modal from '../common/components/Modals/ModalPublic/Modal'
import { ThemeButton } from '../common/enums/themeButton'

const NotFound = () => {
  const router = useRouter()
  const handleModalClose = () => {
    router.back()
  }

  return (
    <div>
      <Image alt="Next.js Logo" height={720} src="/img/404.svg" width={1280} priority />
      <Modal
        bodyText="Page not found. Click the button or close the modal to go back."
        handleModalClose={handleModalClose}
        title="ERROR_404_"
      >
        <Button theme={ThemeButton.PRIMARY} width="196px" onClick={handleModalClose}>
          Go to Back
        </Button>
      </Modal>
    </div>
  )
}

NotFound.getLayout = getLayout
export default NotFound
