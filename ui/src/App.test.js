import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import App from './App.js'
import { GET_ALL_CONTROLS } from './graphql.js'

describe('<App/>', () => {
  describe('given an instance of the Apollo client', () => {
    it('displays a page with DSCO in the title', () => {
      const mocks = [
        {
          request: {
            query: GET_ALL_CONTROLS,
          },
          result: {
            data: {
              controlAll: [
                {
                  title: 'test',
                  definition: 'test',
                  family: 'test',
                  id: '1',
                  additionalGuidance: 'test',
                  allocation: {
                    department: 'test',
                    itSecurityFunction: 'test',
                    cioFunctionIncludingOps: 'test',
                    physicalSecurityGroup: 'test',
                    personnelSecurityGroup: 'test',
                    programAndServiceDeliveryManagers: 'test',
                    process: 'test',
                    project: 'test',
                    itProjects: 'test',
                    facilityAndHardware: 'test',
                    resourceAbstractionAndControlLayer: 'test',
                    infrastructure: 'test',
                    platform: 'test',
                    application: 'test',
                  },
                },
              ],
            },
          },
        },
      ]

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>,
      )
      const title = screen.getByText(/DSCO ITSG33 Filter/i)
      expect(title).toBeInTheDocument()
    })
  })
})
