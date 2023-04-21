'use client';

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import PointsModal from "../components/modals/PointsModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <PointsModal users={[]} />
    </>
   );
}
 
export default ModalsProvider;