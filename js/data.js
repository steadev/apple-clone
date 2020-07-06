export const data = [
    {
        type: 'sticky_video',
        height: 5,
        title:{
            text:'AirMug Pro',
            size:'4'
        },
        messages:[
            {
                type: 'main',
                text: '온전히 빠져들게 하는<br />최고급 세라믹',
                width:null,
                size:'2.5',
                in_start: 0.1,
                in_end: 0.2,
                out_start:0.25,
                out_end:0.3,
            },
            {
                type: 'main',
                text: '주변 맛을 느끼게 해주는<br />주변 맛 허용 모드',
                width:null,
                size:'2.5',
                in_start: 0.3,
                in_end: 0.4,
                out_start:0.45,
                out_end:0.5
            },
            {
                type: 'main',
                text: '온종일 편안한<br />맞춤형 손잡이',
                width:null,
                size:'2.5',
                in_start: 0.5,
                in_end: 0.6,
                out_start:0.65,
                out_end:0.7
            },
            {
                type: 'main',
                text: '새롭게 입가를<br />찾아온 매혹',
                width:null,
                size:'2.5',
                in_start: 0.7,
                in_end: 0.8,
                out_start:0.85,
                out_end:0.9
            },
        ],
        canvas: {
            imageUrl: './video/001/IMG_',
            imageExt: 'jpg',
            imageCount: 300,
            in_start:null,
            in_end:null,
            out_start:0.9,
            out_end:1
        }
    },
    {
        type: 'normal',
        height: null,
        title:{
            text:'보통 스크롤 영역',
            size:'3'
        },
        messages:[
            {
                type:'normal',
                text:
                    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex molestias
                    aliquam ipsa repellat delectus officiis repudiandae velit illo at a
                    quaerat necessitatibus quod maiores, nesciunt vero assumenda. Id error
                    earum debitis illo, doloribus doloremque reprehenderit, ea sapiente,
                    quos corporis magni obcaecati molestiae veritatis placeat architecto
                    distinctio culpa nemo magnam exercitationem. Quae atque, sapiente
                    sequi cumque placeat suscipit ut cum alias laudantium repellendus
                    impedit repudiandae quasi at error qui, soluta, reiciendis minima
                    voluptas. Cum optio doloribus architecto. Sapiente, beatae fuga quae
                    ipsum iusto omnis dolores! Alias, delectus, placeat ipsa, asperiores
                    animi est saepe repellat omnis a dicta ducimus fuga? Consectetur unde
                    illo deleniti expedita architecto ducimus pariatur nemo atque eaque
                    aliquam alias quae sit, iusto harum vero! Accusantium blanditiis neque
                    atque cumque iusto sit officiis sapiente voluptas optio mollitia magni
                    possimus, facere voluptatibus animi iste voluptatem corrupti aliquam
                    accusamus necessitatibus dolores eligendi rerum et! Expedita sit, quo,
                    unde tenetur nesciunt qui quod reiciendis laudantium saepe voluptates
                    nisi, voluptatum libero neque iure minima temporibus est a commodi
                    autem provident fugiat eos. Assumenda, in tenetur eum provident
                    officia deleniti! Eius quos inventore architecto quas eligendi
                    tempora. Delectus ipsa iure illo magnam temporibus ducimus provident
                    nisi, quia natus sequi corporis excepturi, sed nihil. Cupiditate!`,
                size:'1.2rem'
            }
        ]
    },
    {
        type: 'sticky_video',
        height: 5,
        // title: null,
        messages:[
            {
                type: 'main',
                text: '<small>편안한 촉감</small>입과 하나 되다',
                width:null,
                size:'2.5',
                in_start: 0.25,
                in_end: 0.3,
                out_start:0.4,
                out_end:0.45,
            },
            {
                type: 'description',
                text: `
                    편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를
                    하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그,
                    AirMug Pro를 만들었습니다. 입에 뭔가 댔다는 감각은 어느새 사라지고
                    오롯이 당신과 음료만 남게 되죠.`,
                width:'50%',
                // size:'2.5',
                top: '10%',
                left: '40%',
                pin: true,
                in_start: 0.6,
                in_end: 0.65,
                out_start:0.68,
                out_end:0.73
            },
            {
                type: 'description',
                text: '온종일 편안한<br />맞춤형 손잡이',
                width: '50%',
                // size:'2.5',
                top: '15%',
                left: '45%',
                pin: true,
                in_start: 0.87,
                in_end: 0.92,
                out_start:0.95,
                out_end:1
            },
        ],
        canvas: {
            imageUrl: './video/002/IMG_',
            imageExt: 'jpg',
            imageCount: 960,
            in_start:0,
            in_end:0.1,
            out_start:0.95,
            out_end:1
        }
    },
    {
        type: 'sticky_image',
        height: 5,
        direction: 'col',
        canvas:{
            imageUrl:[
                './images/blend-image-1.jpg',
                './images/blend-image-2.jpg'
            ]
        }
    }
]