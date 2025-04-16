import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddApplicationsGrid from '../Components/Applications/wizard/AddApplicationsGrid';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { RowContext } from '../App';
import MockAdapter from 'axios-mock-adapter';
import { mockRowContextValues } from './common.test';
import service from '../Services/apiheader';
import { useForm } from 'react-hook-form';
import { getProductCategoryId, getProductFamilyId, getProductPhaseId, getProductTypeId } from '../apis/apiFunctions';


jest.mock('../Components/Applications/wizard/LinkedProducts', () => () => <div>LinkProducts Component</div>);
jest.mock('../Components/Applications/wizard/LinkCountry', () => () => <div>LinkCountry Component</div>);
jest.mock('../Components/Applications/wizard/LinkSection', () => () => <div>LinkSection Component</div>);

jest.mock('../apis/apiFunctions',()=>({
  getProductPhaseId:jest.fn(),
  getProductCategoryId:jest.fn(),
  getProductTypeId:jest.fn(),
  getProductFamilyId:jest.fn()
}));
const mock = new MockAdapter(service);
jest.mock('../types', () => ({
  ...jest.requireActual('../types'),
  useLazyTabs: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

mockRowContextValues.activeRows = [{productName:"productname",producerType:"proceduretype",country:"country1",lms:"lms"},
  {productName:"productname",producerType:"proceduretype",country:"country1",rms:"rms"}
]

jest.mock('../types', () => {
  let activeStepval = 1;
  return {
    useLazyTabs: (tabs: any) => ({
      activeStep:activeStepval,
      handleTabClick:jest.fn((index) => {
        activeStepval =index;
      }),
      get renderedTabs() {
        return Array(tabs.length).fill(false).map((_, i) => i <= activeStepval);
      },
    }),
  };
});

jest.mock('js-cookie');

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => jest.fn()
}));



const mockApplicationData = {
  status: 200,
  data: {
    data: {
      applicationdata: {
        productId: '123',
        productType: 'Test Type',
        productName: 'Test Product',
      }
    }
  }
};
const mockData = {
      "data": {
          "content": [
              {
                  "id": 304,
                  "tenantId": null,
                  "domain_id": null,
                  "createdBy": null,
                  "modifiedBy": null,
                  "createdDate": null,
                  "modifiedDate": null,
                  "deleted": null,
                  "identifier": "10000132_Nepal_m5qr8tc7",
                  "groupid": 147,
                  "applicationdata": "{\"region\":\"CountryGroup_CGCD0002\",\"status\":\"Inactive\",\"country\":\"Country_COCO0154\",\"waveInfo\":[],\"productId\":\"10000132\",\"disabledMS\":[],\"formatType\":\"eCTD\",\"regionName\":\"Asia\",\"eIdentifier\":\"\",\"inactiveFlg\":true,\"productName\":\"Metformin Hydrochloride 1000 mg Tablet\",\"productType\":\"Pharmaceuticals\",\"sectionTree\":{\"Protocols\":{\"Protocols\":[\"1875126362646069250\",\"1874087051536449537\"],\"1800458054353461249\":[\"1800458054353461249\"]}},\"countryNames\":\"Nepal\",\"memberStates\":\"\",\"producerType\":\"Jordan Procedure\",\"productPhase\":\"Investigational\",\"applicationId\":\"\",\"msCountryCode\":[\"1875126362646069250\",\"1874087051536449537\"],\"eSubIdentifier\":\"\",\"productPhaseId\":\"PDPS00002\",\"registrationId\":\"\",\"applicationName\":\"uyutyu\",\"applicationType\":\"Active Substance Master File\",\"procedureNumber\":\"\",\"productCategory\":\"Simple\",\"applicationNumber\":\"\",\"countryIdentifier\":\"\",\"dossierIdentifier\":\"\",\"procedureTypeCode\":\"PCT00014\",\"reasonForInactive\":\"Commercial reasons\",\"eCTDReceptionNumber\":\"\"}",
                  "markfor_delete": 0,
                  "created_by": "vijaykumar.ls@freyrsolutions.com",
                  "created_date": "2025-01-10T18:20:03.531469",
                  "updated_by": "vijaykumar.ls@freyrsolutions.com",
                  "updated_date": "2025-01-13T15:51:15.628524"
              },
              {
                  "id": 256,
                  "tenantId": null,
                  "domain_id": null,
                  "createdBy": null,
                  "modifiedBy": null,
                  "createdDate": null,
                  "modifiedDate": null,
                  "deleted": null,
                  "identifier": "10000094_East Timor_m5m7uo9i",
                  "groupid": 143,
                  "applicationdata": "{\"region\":\"CountryGroup_CGCD0002\",\"status\":\"Inactive\",\"country\":\"Country_COCO0257\",\"waveInfo\":[],\"productId\":\"10000094\",\"disabledMS\":[],\"formatType\":\"eCTD\",\"regionName\":\"Asia\",\"eIdentifier\":\"\",\"inactiveFlg\":true,\"productName\":\"Penciclovir Cream; 1%\",\"productType\":\"Pharmaceuticals\",\"sectionTree\":{\"Protocols\":{\"Protocols\":[\"1874775575155785730\",\"1874085484506726401\"],\"1800458054353461249\":[\"1800458054353461249\"]}},\"countryNames\":\"East Timor\",\"memberStates\":\"\",\"producerType\":\"Jordan Procedure\",\"productPhase\":\"Investigational\",\"applicationId\":\"\",\"msCountryCode\":[\"1875126362646069250\",\"1874087051536449537\"],\"eSubIdentifier\":\"\",\"productPhaseId\":\"PDPS00002\",\"registrationId\":\"\",\"applicationName\":\"\",\"applicationType\":\"Active Substance Master File\",\"procedureNumber\":\"\",\"productCategory\":\"Simple\",\"applicationNumber\":\"fsdf\",\"countryIdentifier\":\"\",\"dossierIdentifier\":\"\",\"procedureTypeCode\":\"PCT00014\",\"reasonForInactive\":\"Commercial reasons\",\"eCTDReceptionNumber\":\"\"}",
                  "markfor_delete": 0,
                  "created_by": "vijaykumar.ls@freyrsolutions.com",
                  "created_date": "2025-01-07T14:06:06.144224",
                  "updated_by": "vijaykumar.ls@freyrsolutions.com",
                  "updated_date": "2025-01-13T15:12:39.758475"
              }
          ],
          "pageable": {
              "pageNumber": 0,
              "pageSize": 10,
              "sort": [],
              "offset": 0,
              "paged": true,
              "unpaged": false
          },
          "totalPages": 8,
          "totalElements": 73,
          "last": false,
          "size": 10,
          "number": 0,
          "sort": [],
          "numberOfElements": 10,
          "first": true,
          "empty": false
      },
      "message": "All applications retrieved successfully",
      "status": 200
}
let mockUseParams: { id?: string } = {};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams,
}));

describe('AddApplicationsGrid', () => {
  const mockUseForm = useForm as jest.Mock;
  // const mockUseParams = useParams as jest.Mock;
   (getProductPhaseId as jest.Mock).mockResolvedValue("PP0001");
   (getProductCategoryId as jest.Mock).mockResolvedValueOnce("ProductCategory_PG0001");
   (getProductTypeId as jest.Mock).mockResolvedValueOnce("ProductType_PT002");
   (getProductFamilyId as jest.Mock).mockResolvedValueOnce("ProductFamily_PFT0001");
  const defaultFormMethods = {
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
    trigger: ()=>  true, 
    getValues:()=>{ return{
      applicationId: '123',
      applicationNumber: '456',
      procedureNumber: '789',
      registrationId: '101112',
      countryIdentifier: ['RMS'],
      countries: [{ label: 'Country1', value: 'country1' }],
      cmsCountry:[{ label: 'Country1', value: 'country1' }],
      mscCountry:[{ label: 'Country1', value: 'country1' }],
      country:[{ label: 'Country1', value: 'country1' }],
      productName:{label:"Metformin Hydrochloride 1000 mg Tablet",value:"Metformin Hydrochloride 1000 mg Tablet"},
      procedureType:{label:"Jordan Procedure",value:"Jordan Procedure"},
      lmsCountry:{label:"lms",value:"lms"},
    }},
  };

  beforeEach(() => {
    sessionStorage.setItem("CellData",JSON.stringify(mockApplicationData));
    (mockUseForm as jest.Mock).mockReturnValue(defaultFormMethods);
    mock.onGet("application/v1/display/123").reply(200, mockApplicationData);
    mock.onGet("application/v1/display-all/refresh-products").reply(200,mockData);
    // (mockUseParams as jest.Mock).mockReturnValue({id:"123"});
  });


  
  test('cancel button',async () => {
    await act(async () => {
    render(
      <Router>
        <RowContext.Provider value={{...mockRowContextValues,selectedRow:[]}}>
          <AddApplicationsGrid />
        </RowContext.Provider>
      </Router>
    );
  });
    fireEvent.click(screen.getByText('cancel'));
  });

  test('renders without crashing and finish button triggers handleSaveData success branch', async () => {
    const setIsAddedMock = jest.fn();
    const setCheckedMock = jest.fn();
    const setApplicationIdentifierMock = jest.fn();

  
    const contextValue = {
      ...mockRowContextValues,
      selectedRow: [
        { id: 'prod-1', productName: 'Test Product', productPhase: '', productCategory: '', productType: '' },
      ],
      setIsAdded: setIsAddedMock,
      setChecked: setCheckedMock,
      setApplicationIdentifier: setApplicationIdentifierMock,
    };
  
    const Cookies = require('js-cookie');
    Cookies.get = jest.fn(() => 'tenant-1');
  
    const postSpy = jest.spyOn(service, 'post');
    mock.onPost("application/v1/addition").reply(200, { data: { status: 200 } });
  
    await act(async () => {
      render(
        <Router>
          <RowContext.Provider value={contextValue}>
            <AddApplicationsGrid />
          </RowContext.Provider>
        </Router>
      );
    });
  
    fireEvent.click(screen.getByText('next'));
    await waitFor(() => {
      expect(screen.getByText('LinkCountry Component')).toBeInTheDocument();
      
      
    });
    
    fireEvent.click(screen.getByText('next'));
    await waitFor(() => {
      expect(screen.getByText('LinkSection Component')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText('finish'));
  
    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith(
        "application/v1/addition",
        expect.any(Array),
        { headers: { "X-TenantID": "tenant-1" } }
      );
      expect(setIsAddedMock).toHaveBeenCalledWith(true);
      expect(setCheckedMock).toHaveBeenCalledWith({});
      expect(setApplicationIdentifierMock).toHaveBeenCalledWith({ label: "", value: "" });
      

    });
  });

  test('opens and closes the cancel dialog', async () => {
    // (useParams as jest.Mock).mockReturnValue({})
    await act(async () => {
      render(
        <Router>
          <RowContext.Provider value={{...mockRowContextValues, selectedRow:[{productName:"product A"},{productName:"product B"}]}}>
            <AddApplicationsGrid />
          </RowContext.Provider>
        </Router>
      );
    });


 
    // Click the cancel button
    fireEvent.click(screen.getByText('cancel'));
    await waitFor(() => {
      expect(screen.getByText('Confirm Cancel')).toBeInTheDocument();
    });
 
    // Click "No" to close the dialog
    fireEvent.click(screen.getByRole('button', { name: /o/i }));
    await waitFor(() => {
      expect(screen.queryByText('Confirm Cancel')).not.toBeInTheDocument();
    });
  });

 
  test('opens and confirms cancel action', async () => {
    await act(async () => {
      render(
        <Router>
          <RowContext.Provider value={{ ...mockRowContextValues, selectedRow: [{ productName: 'Test Product' }] }}>
            <AddApplicationsGrid />
          </RowContext.Provider>
        </Router>
      );
    });
  
    fireEvent.click(screen.getByText('cancel'));
  
    await waitFor(() => {
      expect(screen.getByText('Confirm Cancel')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));
  
    await waitFor(() => {
      expect(screen.queryByText('Confirm Cancel')).not.toBeInTheDocument();
    });
  });
  test('Back button', async () => {
    await act(async () => {
      render(
        <Router>
          <RowContext.Provider value={{ ...mockRowContextValues, selectedRow: [{ productName: 'Test Product' }] }}>
            <AddApplicationsGrid />
          </RowContext.Provider>
        </Router>
      );
    });
    fireEvent.click(screen.getByText('back'));
  });
  
  
  test("Handle Update ", async () => {
    mockUseParams.id = 'multiProduct'; 

    await act(async () => {
      render(
        <Router>
          <RowContext.Provider value={{ ...mockRowContextValues, selectedRow: [{ productName: 'Test Product' }] }}>
            <AddApplicationsGrid  />
          </RowContext.Provider>
        </Router>
      );
    });
  });
  test('handle next', async () => {
    const setIsAddedMock = jest.fn();
    const setCheckedMock = jest.fn();
    const setApplicationIdentifierMock = jest.fn();

    const defaultFormMethods = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
      trigger: ()=>  false, 
      getValues: jest.fn(() => ({
        applicationId: '123',
        applicationNumber: '456',
        procedureNumber: '789',
        registrationId: '101112',
        countryIdentifier: ['RMS'],
        countries: [{ label: 'Country1', value: 'country1' }],
        cmsCountry: [{ label: 'Country1', value: 'country1' }],
        mscCountry: [{ label: 'Country1', value: 'country1' }],
        country: [{ label: 'Country1', value: 'country1' }],
        productName: { label: "Metformin Hydrochloride 1000 mg Tablet", value: "Metformin Hydrochloride 1000 mg Tablet" },
        procedureType: { label: "Jordan Procedure", value: "Jordan Procedure" },
        lmsCountry: { label: "lms", value: "lms" },
      })),
    };
    const contextValue = {
      ...mockRowContextValues,
      selectedRow: [
        { id: 'prod-1', productName: 'Test Product', productPhase: '', productCategory: '', productType: '' },
      ],
      setIsAdded: setIsAddedMock,
      setChecked: setCheckedMock,
      setApplicationIdentifier: setApplicationIdentifierMock,
    };
  
    const Cookies = require('js-cookie');
    Cookies.get = jest.fn(() => 'tenant-1');
  
    const postSpy = jest.spyOn(service, 'post');
    mock.onPost("application/v1/addition").reply(200, { data: { status: 200 } });
  
    await act(async () => {
      render(
        <Router>
          <RowContext.Provider value={contextValue}>
            <AddApplicationsGrid />
          </RowContext.Provider>
        </Router>
      );
    });
  
    fireEvent.click(screen.getByText('next'));
    await waitFor(() => {
      expect(screen.getByText('LinkCountry Component')).toBeInTheDocument();
      
      
    });
    
    fireEvent.click(screen.getByText('next'));
    await waitFor(() => {
      expect(screen.getByText('LinkSection Component')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText('finish'));
  
    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith(
        "application/v1/addition",
        expect.any(Array),
        { headers: { "X-TenantID": "tenant-1" } }
      );
      expect(setIsAddedMock).toHaveBeenCalledWith(true);
      expect(setCheckedMock).toHaveBeenCalledWith({});
      expect(setApplicationIdentifierMock).toHaveBeenCalledWith({ label: "", value: "" });
      

    });
  });

  test("Fetch application data when params passed", async () => {
    mockUseParams.id = '123'; 

    await act(async () => {
      render(
        <Router>
          <RowContext.Provider value={{ ...mockRowContextValues, selectedRow: [{ productName: 'Test Product' }] }}>
            <AddApplicationsGrid  />
          </RowContext.Provider>
        </Router>
      );
    });
  });

// describe("Advanced testcases for AddApplicationsGrid", () => {
// test("blocks next step when no product is selected",  () => {
//     const mockContext1 = {
//      selectedRow: [], // No products selected
//     setIsAdded: jest.fn(),
//     applicationIdentifier: {},
//     setApplicationIdentifier: jest.fn(),
//     setIsEdited: jest.fn(),
//     activeRows: [],
//     setChecked: jest.fn(),
//     error: false,
//     };

//     render(
//       <Router>
//         <RowContext.Provider value={{selectedRow:[], setIsAdded: jest.fn(), setApplicationIdentifier: jest.fn(), setIsEdited: jest.fn(), activeRows: [], setChecked: jest.fn(), error: false}}>
//           <AddApplicationsGrid />
//         </RowContext.Provider>
//       </Router>
//     );

//     // const nextButton = screen.getByRole("button", { name: /next/i });

//     // expect(nextButton).toBeDisabled();
//     expect(screen.getByText("Please select a product")).toBeInTheDocument();
//   });
// });
});
