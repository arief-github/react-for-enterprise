import ConfigureAlert from './Alert';

const CompositionAlert = () => {
  return (
    <>
      <h3 className='text-md md:text-lg font-semibold mb-4'>
        Alert Components
      </h3>

      <h4 className='text-sm md:text-md font-semibold mb-4'>
        Configured Alerts
      </h4>

      <div className='max-w-[30rem] mx-auto space-y-4'>
        <ConfigureAlert
          show
          variant='success'
          text='Your action was completed successfully'
        />
        <ConfigureAlert
          show
          variant='info'
          headerText='Helpful tip'
          text='This is a helpful information'
        />
        <ConfigureAlert
          show
          variant='error'
          headerText='Validation Error'
          text='There was a problem with validating the form'
        />
      </div>
    </>
  );
};

export default CompositionAlert;
