// src/components/public/DeliveryStandards.js
import React from 'react';

const DeliveryStandards = () => {
  const standards = [
    {
      title: "Design Period",
      detail: "AU require 8-10 weeks from receipt of the required documentation and upfront payment to mobilisation to site."
    },
    {
      title: "Non-contestable works",
      detail: "These works are completed by the host company and the timescales (if required) have been confirmed under the scope of works."
    },
    {
      title: "Substations",
      detail: "Substations can have a lead time of up to 18 weeks from date of order to delivery. The order will only be placed once AU receive the upfront payment deposit and acceptance form. Timescales from delivery to energisation can vary depending on the type of substation, construction, testing, commissioning and the DNO energisation timescales."
    },
    {
      title: "Approvals",
      detail: "No works can commence on site until approval has been given by the adopting company."
    },
    {
      title: "Street Works Notices",
      detail: "Proposals for works in the highway must be submitted to local councils for approval before works can be programmed and commence. Subject to the type, length and difficulty of the works, the notice period may be anywhere from 10 days to 3 months+."
    },
    {
      title: "Diversion / Reinforcement works",
      detail: "Some diversion/reinforcement works must be completed by the host company. Timescales are not always provided — please refer to the scope of works for each utility for indication of timescales."
    },
    {
      title: "Mains installation",
      detail: "6 weeks from receipt of correctly completed request form."
    },
    {
      title: "Service connections off new mains installed by AU",
      detail: "4 weeks from receipt of correctly completed request form. Any water certification must be submitted with the service request."
    },
    {
      title: "Service connections off existing mains",
      detail: "Timescales vary depending on utility and area of works. Please refer to scope of works or contact your AU representative for confirmation."
    },
    {
      title: "Material deliveries to site",
      detail: "Usually within 5 working days from receipt of correctly completed materials request form."
    },
    {
      title: "Electric and gas meters",
      detail: "Timescales vary depending on customer's nominated supplier."
    }
  ];

  return (
    <section id="delivery" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            DELIVERY STANDARDS
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Expected timescales for key stages of your project
          </p>
        </div>

        <div className="space-y-8">
          {standards.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-[17px]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          All timescales are indicative and subject to change based on site conditions, 
          approvals, and third-party dependencies.
        </div>
      </div>
    </section>
  );
};

export default DeliveryStandards;