import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product/product.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/Category/category.service';
import { Category } from 'src/app/models/Category';
import * as _ from 'lodash';
import { AssociatedProducts } from 'src/app/models/AssociatedProducts';
import { Guid } from 'guid-typescript';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admproducts',
  templateUrl: './admproducts.component.html',
  styleUrls: ['./admproducts.component.scss']
})
export class AdmProductsComponent implements OnInit{

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder
    ) { }

  productFilter: string;
  registerForm: FormGroup;
  associateForm: FormGroup;
  categories: Category[];
  forAssociate: Promise<any>;
  associateds: Promise<any>;
  file: File;
  selectedCat: {products: Product[], id: Guid};
  productFather: Product;
  associatedProducts: AssociatedProducts[];
  urlImg = environment.images;
  imageName: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  associateMode: string;
  config = {
    displayKey: 'description', // if objects array passed which key to be displayed defaults to description
    search: true, // true/false for the search functionlity defaults to false,
    height: 'auto', // height of the list so that if there are more no of items
    // it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Selecionar', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items.
    // default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Não encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Buscar', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search.
     // if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
  };
  options: object[] = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  associateSon: Product;
  canRemove = false;

  products: Product[];

  @Output()
  reloadComponent = new EventEmitter<any>();

  ngOnInit() {
    this.validation();
    this.categoryService.getCategories().subscribe(cts => {
      this.categories = cts;
    });
    this.productService.getProducts().subscribe(prs => {
      this.products = prs;
    });
    this.productService.getAssociates().subscribe(asspr => {
      this.associatedProducts = asspr;
    });
  }

  associatedsFilter(): Promise<AssociatedProducts[]>{
    return new Promise((resolve, reject) => {
      resolve(this.productFather.associatedProducts);
  });
  }

  con(event: Product, type){
    console.log(this.selectedCat);
    console.log(event);
    this.productFather = event;
    if (this.associateMode === 'add'){
      switch (type)
    { case 'father':
        this.associateForm.get('productFatherId').setValue(event.id);
        if (this.productFather.associatedProducts && this.productFather.associatedProducts.length > 0){
          this.forAssociate = this.productService.getProducts().toPromise().then(prs => {
            const filtered = [];
            prs.forEach((product) => {
              this.productFather.associatedProducts.forEach(product2 => {
                  if (product.associatedProducts && product.associatedProducts.length > 0){
                    product.associatedProducts.forEach(pr => {
                      if (product2.productSon.id !== product.id && product.id !== this.productFather.id
                        && this.productFather.id !== pr.productSon.id){
                        filtered.push(product);
                        console.log('foi na primeira');
                      }
                    });
                  }
                  else {
                    if (product2.productSon.id !== product.id && product.id !== this.productFather.id){
                      filtered.push(product);
                      console.log('foi na segunda');
                    }
                  }
              });
            });
            return filtered;
          });
        }
        else {
          this.forAssociate = this.productService.getProducts().toPromise().then(prs => {
            const filtered2 = [];
            prs.forEach((product) => {
              if (product.associatedProducts && product.associatedProducts.length > 0){
                product.associatedProducts.forEach(aspr => {
                  if (aspr.productSon.id !== this.productFather.id && product.id !== this.productFather.id){
                    filtered2.push(product);
                  }
                });
              }
              else{
                if (product.id !== this.productFather.id){
                  filtered2.push(product);
                }
              }
            });
            return filtered2;
          });
        }
        break;

      case 'son':
        this.associateForm.get('productSonId').setValue(event.id);
        break;
    }
    }
    else{
      if (event.associatedProducts && event.associatedProducts.length > 0){
        this.associateds = this.associatedsFilter().then(prs => prs.map(ass => ass.productSon));
      }
      else {
        this.toastr.warning(`${event.model} não tem produtos associados`, 'Atenção');
      }
    }
    console.log(this.associateForm.value);
  }

  deleteProduct(pr: Product){
    if (pr.associatedProducts && pr.associatedProducts.length > 0){
      this.toastr.warning(`${pr.model} contém associações, apague-as para poder exluir o produto`, 'Atenção');
    }
    else {
      this.productService.deleteProduct(pr.id).subscribe(
        success => {
          this.toastr.success(`${pr.model} exluído com sucesso`, 'Feito');
          this.reloadComponent.emit('Foi');
        },
        error => {
          this.toastr.error('Tente novamente', 'Ops :(');
        }
      );
    }
  }

  postProduct(){
    const product = Object.assign({}, this.registerForm.value);

    if (!this.imageName || !this.cardImageBase64){
      this.toastr.warning('Insira uma imagem para o produto', 'Atenção');
    }
    else {
      this.productService.postProduct(product).subscribe(
        success => {
          this.toastr.success('Adicionado com sucesso', 'Show!');
          this.imageName = null;
          this.registerForm.reset();
          console.log(success);
        },
        error => console.log(error)
      );
    }
  }

  putProduct(modal: ModalDirective, product: Product){
    this.createBlur();
    modal.show();
    console.log(this.file);
    this.registerForm.setValue({
      name: product.name,
      id: product.id,
      image: '',
      imageUpload: '',
      model: product.model,
      amount: product.amount,
      brand: product.brand,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      active: product.active
    });

  }

  conss(){console.log(this.registerForm.value); }

  postAssociate(){
    const associate = Object.assign({}, this.associateForm.value);
    this.productService.postAssociate(associate).subscribe(
      success => {
        this.selectedCat = null;
        this.forAssociate = null;
        this.toastr.success('Produtos associados', 'Show!');
      },
      error => console.log(error)
    );
  }

  preloadRemove(event){
    this.canRemove = true;
    this.associateSon = event;
  }

  removeAssociate(){
    const associate = this.associatedProducts.find(pr => pr.productSon.id === this.associateSon.id);
    this.productService.deleteAssociates(associate.id).subscribe(
      success => {
        this.toastr.success('Associação desfeita', 'Show!');
        this.selectedCat = null;
        this.canRemove = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  createBlur(){
    document.getElementById('test').style.filter = 'blur(3px)';
  }

  validation(){
    this.registerForm = this.fb.group({
      name: ['', [Validators.minLength(15), Validators.maxLength(60), Validators.required]],
      brand: ['', [Validators.minLength(2), Validators.required]],
      model: ['', [Validators.minLength(5), Validators.required]],
      description: ['', [Validators.minLength(15), Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      active: [true],
      image: [''],
      imageUpload: [''],
      id: ['']
    });

    this.associateForm = this.fb.group({
      productFatherId: ['', Validators.required],
      productSonId: ['', Validators.required]
    });
  }

  saveChanges(modal: ModalDirective){
    if (this.registerForm.valid){
      let product: Product = {};
      if (this.file && this.file.size > 0){
        product = Object.assign({}, this.registerForm.value);
      }
      else{
          product = {
          name: this.registerForm.get('name').value,
          brand: this.registerForm.get('brand').value,
          model: this.registerForm.get('model').value,
          description: this.registerForm.get('description').value,
          price: this.registerForm.get('price').value,
          amount: this.registerForm.get('amount').value,
          active: this.registerForm.get('active').value,
          categoryId: this.registerForm.get('categoryId').value,
          id: this.registerForm.get('id').value
        };
      }
      this.productService.putProduct(product).subscribe(pr => {
        this.closeModal(modal);
        this.toastr.success(`${product.model} atualizado`, 'Show!');
        this.ngOnInit();
      });
    }
  }

  closeModal(modal: ModalDirective){
    this.registerForm.reset();
    document.getElementById('test').style.filter = 'blur(0)';
    modal.hide();
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
      const file = fileInput.target.files[0];
      const maxSize = 20971520;
      const allowedTypes = ['image/png', 'image/jpeg'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      if (fileInput.target.files[0].size > maxSize) {
        this.imageError = 'O tamanho máximo permitido é ' + maxSize / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowedTypes, fileInput.target.files[0].type)) {
        this.imageError = 'Apenas Imagens são permitidas ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
            const imgHeight = rs.currentTarget['height'];
            const imgWidth = rs.currentTarget['width'];
            console.log(imgHeight, imgWidth);

            if (imgHeight > maxHeight && imgWidth > maxWidth) {
                this.imageError = `Dimensões máximas permitidas ${maxHeight} '*' ${maxWidth} px`;
                return false;
            } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path.split(',').pop();
                  this.isImageSaved = true;
                  this.imageName = file.name;
                  this.registerForm.get('imageUpload').setValue(this.cardImageBase64);
                  this.registerForm.get('image').setValue(this.imageName);
                   // this.previewImagePath = imgBase64Path;
                }
            };
        };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
