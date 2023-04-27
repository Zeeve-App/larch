/* eslint-disable max-len */
export default function Documentation() {
  return (
    <div className='bg-black p-6 overflow-y-scroll flex flex-col flex-nowrap content-center justify-left items-left font-rubik'>
      <div className='flex flex-col gap-4'>
        <div className=''>
          <h1 className='text-white font-rubik  text-2xl font-bold '>
            Larch Documentation
          </h1>
        </div>
        <div className='w-full flex justify-left'>
          <div className='h-0.5 w-full bg-grey mb-4 px-5' />
        </div>
        <div className=''>
          <h2 className='text-white font-rubik  text-xl font-bold'>Features</h2>
          <div className='pl-4'>
            <ul className='list-disc text-white gap-4'>
              <li className='pb-4'>
                Network creation and cleanup (currently support Podman)
              </li>
              <li className='pb-2'>
                Network Listing
                <ul className='list-disc list-inside text-white gap-4'>
                  <li className='pb-4'>Network Progress</li>
                  <li className='pb-4'>
                    Network logs (Zombienet CLI logs and Podman (on demand,
                    separate tab))
                  </li>
                </ul>
              </li>
              <li className='pb-4'>Testing</li>
              <li className='pb-2'>Network Monitoring (next phase)</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className='text-white font-rubik  text-xl font-bold'>Usage</h2>
          <div className='pl-4'>
            <ul className='list-disc text-white gap-4 '>
              <li className='pb-4 font-rubik text-lg'>
                <h3>Create Template</h3>
              </li>
              <li className='pb-4 font-rubik text-lg'>
                <h3>Create Network</h3>
              </li>
              <li className='pb-4 font-rubik text-lg'>
                <h3>Network Management</h3>
              </li>
            </ul>
          </div>
        </div>
        <div className='pb-6'>
          <h2 className='text-white font-rubik text-xl font-bold '>
            Components
          </h2>
        </div>
      </div>

      <div className='flex flex-col gap-y-2'>
        {/* eslint-disable-next-line max-len */}

        <div className='bg-create-button flex flex-col gap-4 p-6 border-2 border-border rounded-2xl border-solid box-border w-max'>
          <h3 className='text-white font-rubik text-xl font-bold text-left'>
            Dashboard
          </h3>
          <div>
            <h3 className='text-white font-rubik font-bold'>Description</h3>
            <p className='text-white font-rubik leading-8'>
              It shows the every page short description with page link
            </p>
          </div>
          <div>
            <h3 className='text-white font-rubik font-bold'>Features</h3>
            <ul className='list-disc text-white gap-4'>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
            </ul>
          </div>
        </div>
        <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border w-max'>
          <h3 className='text-white font-rubik text-xl font-bold text-left'>
            My Network
          </h3>

          <div>
            <h3 className='text-white font-rubik font-bold'>Description</h3>
            <span className='text-white font-rubik leading-8'>
              It shows the created network list
            </span>
          </div>
          <h3 className='text-white font-rubik font-bold'>Features</h3>
          <ul className='list-disc text-white gap-4'>
            <li className='pb-4'>It shows network creation date and time</li>
            <li className='pb-4'>
              network has two action delete and test by which a network can be
              delete or test
              {' '}
            </li>
          </ul>
        </div>
        <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border max-w-max'>
          <h3 className='text-white font-rubik text-xl font-bold text-left'>
            Template
          </h3>

          <div>
            <h3 className='text-white font-rubik font-bold'>Description</h3>
            <span className='text-white font-rubik leading-8'>
              Template is created for network creation
            </span>
          </div>
          <h3 className='text-white font-rubik font-bold'>Features</h3>
          <ul className='list-disc text-white gap-4'>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
          </ul>
        </div>
        <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border max-w-max'>
          <h3 className='text-white font-rubik text-xl font-bold text-left'>
            Run List
          </h3>

          <div>
            <h3 className='text-white font-rubik font-bold'>Description</h3>
            <span className='text-white font-rubik leading-8'>
              It shows the every page short description
            </span>
          </div>
          <h3 className='text-white font-rubik font-bold'>Features</h3>
          <ul className='list-disc text-white gap-4'>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-y-2'>
          <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border max-w-max'>
            <h3 className='text-white font-rubik text-xl font-bold text-left'>
              Activity
            </h3>

            <div>
              <h3 className='text-white font-rubik font-bold'>Description</h3>
              <span className='text-white font-rubik leading-8'>
                Activity shows the every activity done by the user
              </span>
            </div>
            <h3 className='text-white font-rubik font-bold'>Features</h3>
            <ul className='list-disc text-white gap-4'>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
              <li className='pb-4'>
                Now this is a story all about how, my life got flipped-turned
                upside down
              </li>
            </ul>
          </div>
        </div>
        <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border max-w-max'>
          <h3 className='text-white font-rubik text-xl font-bold text-left'>
            Setting
          </h3>

          <div>
            <h3 className='text-white font-rubik font-bold'>Description</h3>
            <span className='text-white font-rubik leading-8'>
              It set the endpoint of server
            </span>
          </div>
          <h3 className='text-white font-rubik font-bold'>Features</h3>
          <ul className='list-disc text-white gap-4'>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
          </ul>
        </div>
        <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border max-w-max'>
          <h3 className='text-white font-rubik text-xl font-bold text-left'>
            Email Us
          </h3>

          <div>
            <h3 className='text-white font-rubik font-bold'>Description</h3>
            <span className='text-white font-rubik leading-8'>
              It sends the mail any user by the company email
            </span>
          </div>
          <h3 className='text-white font-rubik font-bold'>Features</h3>
          <ul className='list-disc text-white gap-4'>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
          </ul>
        </div>
        <div className='bg-create-button flex flex-col gap-6 p-6 border-2 border-border rounded-2xl border-solid box-border max-w-max'>
          <h3 className='text-white font-rubik text-xl font-bold text-left'>
            Help and Support
          </h3>

          <div>
            <h3 className='text-white font-rubik font-bold'>Description</h3>
            <span className='text-white font-rubik leading-8'>
              This page is for support
            </span>
          </div>
          <h3 className='text-white font-rubik font-bold'>Features</h3>
          <ul className='list-disc text-white gap-4'>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li className='pb-4'>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
