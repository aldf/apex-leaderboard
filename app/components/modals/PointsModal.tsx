"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import usePointsModal from "@/app/hooks/usePointsModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import Heading from "../Heading";
import UserSelect, { UserSelectValue } from "../inputs/UserSelect";
interface ModalProps {
    users: any[];   
}

const PointsModal: React.FC<ModalProps> = ({ users }) => {
  const router = useRouter();
  const pointsModal = usePointsModal();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      userId: "123456789012345678",
      points: 1,
    },
  });

  const points = watch("points");
  const userId = watch("userId");

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add points"
        subtitle="How many points do you want to add?"
      />
      <UserSelect users={users} value={userId?.id} onChange={(value) => setValue("userId", value?.id, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
        })} />
      <hr />
      <Counter
        onChange={(value) => setValue("points", value,{
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
          })}
        value={points}
        title="Points"
        subtitle="How many points?"
      />
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    setIsLoading(true);

    axios.post('/api/points', data)
    .then(() => {
      toast.success('points created!');
      router.refresh();
      reset();
      pointsModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={pointsModal.isOpen}
      title="Add points!"
      actionLabel="Save"
      onSubmit={handleSubmit(onSubmit)}
      onClose={pointsModal.onClose}
      body={bodyContent}
    />
  );
};

export default PointsModal;