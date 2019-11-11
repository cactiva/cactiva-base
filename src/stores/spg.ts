import { observable } from "mobx";

export default observable({
  roadplan: [
    {
      date: "11 Nov 2019",
      header: true
    },
    {
      id: 1,
      outlet: "Carefour",
      date: "2019-11-11",
      time: "08.00",
      status: "Pending",
      approval: "Waiting",
      remarks:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 2,
      outlet: "Transmart",
      date: "2019-11-11",
      time: "10.00",
      status: "Pending",
      approval: "Waiting",
      remarks:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  ],
  visit: [],
  visitTemp: null,
  selectedPlan: null,
  checkin: false,
  event: [
    {
      date: "11 Nov 2019",
      header: true
    },
    {
      id: 1,
      lokasi: "Carefour",
      event_date: "2019-11-11",
      remarks:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      target: "Memperkenalkan produk baru",
      contact_person_name: "Nuril",
      contact_person_phone: "08444444444",
      status: "Pending"
    },
    {
      id: 2,
      lokasi: "Transmart",
      event_date: "2019-11-11",
      remarks:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      target: "Memperkenalkan produk baru",
      contact_person_name: "Lolita",
      contact_person_phone: "089666666666",
      status: "Pending"
    }
  ],
  eventResult: [],
  resultTemp: null,
  selectedEvent: null,
  checkinEvent: false,
  report: [
    {
      date: "11 Nov 2019",
      header: true
    },
    {
      id: 1,
      outlet: "Carefour",
      date: "2019-11-11",
      feedback:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      remarks:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 2,
      outlet: "Transmart",
      date: "2019-11-11",
      feedback:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      remarks:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  ],
  selectedReport: null
});
